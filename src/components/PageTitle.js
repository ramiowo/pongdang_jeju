import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | 퐁당제주</title>
    </Helmet>
  );
};

export default PageTitle;
