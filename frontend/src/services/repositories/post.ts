export default () => {
  return {
    async fetchPostList(query: { search: string; community: string }) {
      try {
        const baseUrl = "http://localhost:3000/dataWow/post";

        // Construct query parameters dynamically
        const params = new URLSearchParams();
        if (query.search.trim() !== "") {
          params.append("search", query.search);
        }
        if (query.community.trim() !== "" && query.community !== "all") {
          params.append("community", query.community);
        }

        const url = `${baseUrl}?${params.toString()}`; // Append query parameters to the base URL

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();

        return results;
      } catch (error) {
        console.error("Error fetching post list:", error);
        throw error;
      }
    },
  };
};
