import { BankOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";

import styles from "./CompanyLogo.module.css";

const getLogoUrl = (website) => {
  try {
    return `https://logo.clearbit.com/${new URL(website).hostname}`;
  } catch {
    return null;
  }
};

const CompanyLogo = ({ company }) => {
  const [hasLoadError, setHasLoadError] = useState(false);
  const logoUrl = getLogoUrl(company.website);

  if (!logoUrl || hasLoadError) {
    return <Avatar icon={<BankOutlined />} className={styles.fallback} />;
  }

  return (
    <img
      src={logoUrl}
      alt=""
      loading="lazy"
      className={styles.logo}
      onError={() => setHasLoadError(true)}
    />
  );
};

export default CompanyLogo;
