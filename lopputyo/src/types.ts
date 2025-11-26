export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: {
      href: string;
    },
    customer: {
      href: string;
    },
    trainings: {
      href: string;
    }
  }
}

export type Training = {
  id: number;
  date: string;
  duration: number;
  activity: string;
    _links: {
      self: {
        href: string;
      },
      training: {
        href: string;
      },
      customer: {
        href: string;
      }
  }
}