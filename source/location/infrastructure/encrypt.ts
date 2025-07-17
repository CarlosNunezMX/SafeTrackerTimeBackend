import Location from "../domain/Location";
import { randomBytes, createCipheriv, Cipher, createDecipheriv, scryptSync } from "node:crypto"
import type LocationDTO from "./locationDTO";

export default class LocationEncryption {
    private key: Buffer;
    constructor(key: string) {
        this.key = scryptSync(key, "salt", 32);
    };
    toDatabase(location: Location): LocationDTO {
        const iv = randomBytes(16);
        const cipher = createCipheriv("aes-256-gcm", this.key, iv);
        let encrypted = cipher
            .update(`${location.x},${location.y}`, "utf-8", "hex");
        encrypted += cipher.final();
        const tag = cipher.getAuthTag();


        return {
            date: location.date,
            id: location.id,
            userID: location.userID,
            encriptedLocation: encrypted,
            iv: iv.toString("hex"),
            tag: tag.toString("hex")
        }
    }

    toClient(dto: LocationDTO): Location {
        const decipher = createDecipheriv("aes-256-gcm",
            this.key,
            Buffer.from(dto.iv, "hex"),
        );

        decipher.setAuthTag(Buffer.from(dto.tag, "hex"));


        let decrypted = decipher.update(dto.encriptedLocation, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        const [x_str, y_str] = decrypted.split(",");
        const x = parseFloat(x_str),
            y = parseFloat(y_str);
        return new Location(
            dto.id!,
            x,
            y,
            dto.date,
            dto.userID
        )
    }
};
