const { USERNAME, PASSWORD } = process.env;

const loginService = {
  login: async (username: string, password: string) => {
    if (USERNAME !== username || PASSWORD !== password) {
      return { login: false };
    }

    return { login: true };
  }
};

export default loginService;
