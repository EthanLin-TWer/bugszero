export enum Category {
  Pop = "Pop",
  Science = "Science",
  Sports = "Sports",
  Rock = "Rock",
  History = "History",
  Blues = "Blues"
}

export class Categories {
  public static values(): Array<Category> {
    // @ts-ignore
    return Object.values(Category);
  }

  public static in(position: number): Category {
    const categories = Categories.values();
    return categories[position % categories.length];
  }
}
