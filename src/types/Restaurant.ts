export type RestaurantPage = {
  docs: [Restaurant];
  page: number;
  offset: number;
  limit: number;
};

export type Restaurant = {
  _id: string;
  name: string;
  mealType: string;
  image: {url: string};
  addressInfo: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contacts: {
    email: string;
    phoneNumber: string;
  };
  cuisines: [
    {
      name: {'pt-BR': string};
    },
  ];
};
