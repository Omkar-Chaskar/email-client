import axios from "axios";

export const fetchBody = async (mail) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://flipkart-email-mock.now.sh/?id=" + mail.id,
      });
      console.log(data)
      return { data };
    } catch (err) {
      console.error(err);
    }
};
  