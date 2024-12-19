export default () => {
  return {
    async createComment(postId: string, userId: string, message: string) {
      try {
        const response = await fetch(
          `http://localhost:3000/dataWow/comment/${postId}`,
          {
            method: "POST",
            headers: {
              "user-id": userId,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
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
