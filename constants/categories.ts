import design from "../public/design.png";

interface ICategories {
  id: number;
  name: string;
  image: any;
}

export const categories: ICategories[] = [
  {
    id: 1,
    name: "Дизайн",
    image: design,
  },
  {
    id: 2,
    name: "Разработка",
    image: design,
  },
  {
    id: 3,
    name: "Маркетинг",
    image: design,
  },
  {
    id: 4,
    name: "ИТ и ПО",
    image: design,
  },
  {
    id: 5,
    name: "Личностный рост",
    image: design,
  },
  {
    id: 6,
    name: "Бизнес",
    image: design,
  },
  {
    id: 7,
    name: "Фотография",
    image: design,
  },
  {
    id: 8,
    name: "Музыка",
    image: design,
  },
];
