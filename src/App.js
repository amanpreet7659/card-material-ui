import { useEffect, useState } from "react";
import reqJson from "./JSON/requ.json";
import { Box, Card, Chip, Tab, Tabs, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import moment from "moment/moment";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const App = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const tabData = reqJson.map((item) => item["Account Management Lead"]);
    let filterTabData = new Set(tabData);
    filterTabData = [...filterTabData];
    setTabs(filterTabData);
    setSelectedTab(filterTabData[0]);
  }, []);

  const getChipColor = (date) => {
    const cardDate = moment(date).format("DD MM YYYY");
    const currentDate = moment().format("DD MM YYYY");
    return cardDate < currentDate ? "warning" : "success";
  };

  return (
    <div className="">
      <Tabs
        value={activeTab}
        onChange={(e, nv) => {
          setActiveTab(nv);
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            {...a11yProps(index)}
            onClick={() => {
              setSelectedTab(tab);
            }}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel value={activeTab} index={index} key={index}>
          <Row>
            {reqJson
              .filter((data, index) =>
                data["Account Management Lead"].includes(selectedTab)
              )
              .map((item, index) => (
                <Col
                  sm={4}
                  xl={4}
                  md={4}
                  lg={4}
                  xs={2}
                  className="mb-4"
                  key={index}
                >
                  <Card>
                    <div
                      className="p-1"
                      style={{
                        position: "relative",
                        minHeight: "200px",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "20%",
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap:"5  px"
                          }}
                        >
                          <img
                            src={
                              item["Creative Lead Image"] ||
                              "/assets/images/user.png"
                            }
                            width={40}
                            style={{
                              borderRadius: "50%",
                            }}
                          />
                          {item["Due Date"] && item["Due Date"] != "*" && (
                            <Chip
                              label={moment(item["Due Date"]).format("D MMM")}
                              size="small"
                              color={getChipColor(item["Due Date"])}
                            />
                          )}
                        </div>
                        <img
                          src={
                            item["Brand Image"] || "/assets/images/wallet.png"
                          }
                          alt="brand-image"
                          style={{
                            width: 100,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#7878781d",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        minHeight: "80px",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        {item["Account Management Lead"]}
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#909090",
                        }}
                      >
                        {item["Job Description"]}
                      </span>
                      <br />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {item.Remarks}
                      </span>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </TabPanel>
      ))}
    </div>
  );
};

export default App;
