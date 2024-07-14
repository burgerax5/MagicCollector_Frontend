export interface CardConditionOwnedDTO {
    cardId: number,
    condition: "NM" | "EX" | "VG" | "G",
    quantity: number
}