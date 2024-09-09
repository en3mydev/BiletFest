import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import VerificaBilet from "../components/VerificaBilet";
import AdaugaFestival from "../components/AdaugaFestival";
import AdaugaVoucherCode from "../components/AdaugaVoucherCode";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Check tickets"
            {...a11yProps(0)}
            style={{ fontWeight: "700" }}
          />
          <Tab
            label="Add festival"
            {...a11yProps(1)}
            style={{ fontWeight: "700" }}
          />
          <Tab
            label="Add Voucher Code"
            {...a11yProps(2)}
            style={{ fontWeight: "700" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VerificaBilet />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AdaugaFestival />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AdaugaVoucherCode />
      </CustomTabPanel>
    </Box>
  );
}
