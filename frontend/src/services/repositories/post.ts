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

    async createPost(
      data: { title: string; description: string; communityId: number },
      userId: string
    ) {
      try {
        const response = await fetch("http://localhost:3000/dataWow/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
  };
};
