export const Categories = {
  Pop: "Pop",
  Science: "Science",
  Sports: "Sports",
  Rock: "Rock",
  History: "History",
  Blues: "Blues"
};

enum Temp_Categories {
  Pop,
  Science,
  Sports,
  Rock,
  History,
  Blues
}

export class Category {
  // this suppose to be a method in the enum - TypeScript doesn't support
  public static in(position: number) {
    // enum has double keys than you declared, /2 is origin size
    const categoryCounts = Object.keys(Temp_Categories).length / 2;
    const result = Temp_Categories[position % categoryCounts];

    console.log(`The category is ${result}`);
    return result;
  }
}
