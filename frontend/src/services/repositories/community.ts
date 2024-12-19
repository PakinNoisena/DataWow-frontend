export default () => {
  return {
    async fetchCommunityList() {
      try {
        const response = await fetch("http://localhost:3000/dataWow/community");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();

        return results;
      } catch (error) {
        throw error;
      }
    },
  };
};
