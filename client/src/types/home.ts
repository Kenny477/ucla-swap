export interface mainHero {
    title: string;
    subtitle: string;
    description: string;
    img: string;
    primaryAction: {
      text: string;
      href: string;
    },
}

export interface features {
    title: string,
    item1:
      {
        title: string,
        description: string,
        img: string,
      },
      item2:
      {
        title: string,
        description: string,
        img: string,
      },
      item3:
      {
        title: string,
        description: string,
        img: string,
      },
}