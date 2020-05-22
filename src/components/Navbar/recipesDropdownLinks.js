const recipeDropdownLinks = [
  {
    text: "Category",
    innerDropdown: [
      {
        text: "Pizza Recipes",
        path: "/recipes",
        query: "?category=pizza",
      },
      {
        text: "Pasta Recipes",
        path: "/recipes",
        query: "?category=pasta",
      },
      {
        text: "Drinks",
        path: "/recipes",
        query: "?category=drinks",
      },
      {
        text: "Cakes",
        path: "/recipes",
        query: "?category=cakes",
      },
      {
        text: "Salad Recipes",
        path: "/recipes",
        query: "?category=salad",
      },
      {
        text: "Soup Recipes",
        path: "/recipes",
        query: "?category=soup",
      },
      {
        text: "Other Recipes",
        path: "/recipes",
        query: "?category=other",
      },
    ],
  },
  {
    text: "Difficulty",
    innerDropdown: [
      {
        text: "Easy",
        path: "/recipes",
        query: "?difficulty=easy",
      },
      {
        text: "Medium",
        path: "/recipes",
        query: "?difficulty=medium",
      },
      {
        text: "Hard",
        path: "/recipes",
        query: "?difficulty=hard",
      },
    ],
  },
  {
    text: "Course",
    innerDropdown: [
      {
        text: "Lunch",
        path: "/recipes",
        query: "?course=lunch",
      },
      {
        text: "Breakfast",
        path: "/recipes",
        query: "?course=breakfast",
      },
      {
        text: "Dinner",
        path: "/recipes",
        query: "?course=dinner",
      },
      {
        text: "Desert",
        path: "/recipes",
        query: "?course=desert",
      },
      {
        text: "Appetizer",
        path: "/recipes",
        query: "?course=appetizer",
      },
    ],
  },
  {
    text: "Cooking Time",
    innerDropdown: [
      {
        text: "0-20 minutes",
        path: "/recipes",
        query: "?cookingTime=0-20%20minutes",
      },
      {
        text: "20-30 minutes",
        path: "/recipes",
        query: "?cookingTime=20-30%20minutes",
      },
      {
        text: "30-50 minutes",
        path: "/recipes",
        query: "?cookingTime=30-50%20minutes",
      },
      {
        text: "50+ minutes",
        path: "/recipes",
        query: "?cookingTime=50+%20minutes",
      },
    ],
  },
];

export default recipeDropdownLinks;
