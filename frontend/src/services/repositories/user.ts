export default () => {
  return {
    async signIn(username: string) {
      try {
        const response = await fetch(
          "http://localhost:3000/dataWow/users/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};
