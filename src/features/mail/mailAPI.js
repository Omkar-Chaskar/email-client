import axios from "axios";

export const fetchMail = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://flipkart-email-mock.now.sh/",
      });
      console.log(data.list)
      return { data };
    } catch (err) {
      console.error(err);
    }
};
  