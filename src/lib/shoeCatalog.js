export const SHOE_MODELS = [
  {
    type: "01",
    name: "Classic Sneaker",
    category: "Classic Sneaker",
    defaultColor: "White",
    colors: ["White", "Black", "Navy Blue", "Red"],
    assets: {
      White: "white-01.png",
      Black: "black-01.png",
      "Navy Blue": "navy-01.png",
      Red: "red-01.png",
    },
  },
  {
    type: "02",
    name: "Running Shoe",
    category: "Running Shoe",
    defaultColor: "White",
    colors: ["White", "Black"],
    assets: {
      White: "white-02.png",
      Black: "black-02.png",
    },
  },
  {
    type: "03",
    name: "High-Top Sneaker",
    category: "High-Top Sneaker",
    defaultColor: "White",
    colors: ["White", "Black"],
    assets: {
      White: "white-03.png",
      Black: "black-03.png",
    },
  },
  {
    type: "04",
    name: "Skate Shoe",
    category: "Skate Shoe",
    defaultColor: "White",
    colors: ["White", "Black"],
    assets: {
      White: "white-04.png",
      Black: "black-04.png",
    },
  },
];

export const SHOE_VARIANTS = SHOE_MODELS.flatMap((model) =>
  model.colors.map((color) => ({
    type: model.type,
    name: model.name,
    category: model.category,
    color,
    file: model.assets[color],
    src: `/${model.assets[color]}`,
  })),
);

export const DEFAULT_SHOE_SELECTION = {
  modelType: "01",
  color: "White",
};

export function getModelByType(type) {
  return SHOE_MODELS.find((model) => model.type === type) || SHOE_MODELS[0];
}

export function getAvailableColors(type) {
  return getModelByType(type).colors;
}

export function getVariantForSelection(selection) {
  const model = getModelByType(selection?.modelType || DEFAULT_SHOE_SELECTION.modelType);
  const color = model.colors.includes(selection?.color) ? selection.color : model.defaultColor;
  const file = model.assets[color] || model.assets[model.defaultColor];

  return {
    type: model.type,
    name: model.name,
    category: model.category,
    color,
    file,
    src: `/${file}`,
  };
}