/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  getPrifinaWidgetsQuery,
  getPrifinaUserQuery,
  installWidgetMutation,
  listAppMarketQuery,
} from "@prifina-apps/utils";

import PropTypes from "prop-types";

import styled, { createGlobalStyle } from "styled-components";

import { BlendIcon } from "@blend-ui/icons";
import { Box, Flex, Text, Button, Image } from "@blend-ui/core";

import { PrifinaLogo } from "../../components/PrifinaLogo";

import { ReactComponent as DefaultWidget } from "../../assets/third-party-app.svg";

import bxsCheckCircle from "@iconify/icons-bx/bxs-check-circle";
import bxsXCircle from "@iconify/icons-bx/bxs-x-circle";
import lefArrow from "@iconify/icons-bx/bxs-chevron-left";

//import { ReactComponent as PrifinaLogoImage } from "../assets/prifina.svg";

const propTest = props => {
  console.log("PROP TEST ", props);
  return null;
};
const WidgetBase = styled.div`
  display: flex;
  padding-top: 15px;
  padding-right: 15px;
  width: 310px;
  height: 103px;
  background: #fbfbfb; // color missing from theme
  box-shadow: 0px 4px 8px #ebf0f1; // color missing,... shadow missing from theme
  border-radius: 0.625rem; // missing from theme...
  margin-right: 24px;
  margin-bottom: 24px;
`;

const StyledText = styled(Text)`
  width: 190px;
  font-weight: ${props =>
    props.hasOwnProperty("fontWeight")
      ? Object.keys(props.theme.fontWeights).indexOf(props.fontWeight) > -1
        ? props.theme.fontWeights[props.fontWeight]
        : props.fontWeight
      : "null"};
`;

const StyledDescription = styled(Text)`
  color: #6b767e;
  word-break: break-word;
`;

const InstallButton = styled(Button)`
  width: 74px; // fixed width is not good idea... because of the translations
  min-width: 74px; //
  background: #47a7d6; // not on theme
  border-radius: 15px; // not on theme
  line-height: 23px;
`;

const InstalledText = styled(Text)`
  color: #47a7d6; // not on theme
  line-height: 23px;
`;
const TitleText = styled(Text)`
  /* */
`;

const GlobalStyle = createGlobalStyle`
.app-market path {
  fill: #47a7d6;
}
`;

//not on blend theme
const TextButton = styled(Button)`
  background: transparent;
  color: black;
  border: 0;
  padding: 0;
  font-size: 14px;
  &:hover {
    border: 0 !important;
    background: white !important;
    color: grey !important;
  }
`;

//not on blend theme
const OutlineButton = styled(Button)`
  background: white; // not on theme
  border: 1px solid #4295e1;
  color: #4295e1;
  line-height: 23px;
  &:hover {
    border: 1px solid #4295e1 !important;
    background: white !important;
    color: #4295e1 !important;
  }
`;

//not on blend theme
const UnderlineButton = styled(Button)`
  background: white; // not on theme
  border-radius: 0;
  border: 0;
  border-bottom: 2px solid #4295e1;
  color: #4295e1;
  line-height: 23px;
  font-size: 14px;
  &:hover {
    border: 0 !important;
    border-bottom: 2px solid #4295e1 !important;
    background: white !important;
    color: #4295e1 !important;
  }
`;

//not in blend theme
const Badge = styled.span`
  min-width: 98px;
  height: 27px;
  border-radius: 20px;
  background: #d1eaf9;
  font-size: 12px;
  line-height: 27px;
  color: #066fe1;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;

//not in blend theme

const OrderedList = styled.ol`
  margin: 0;
  list-style-position: outside;
  padding-inline-start: 20px;
  margin-block-start: 0px;
  padding: 0;
  padding-left: 20px;
`;
const ListItem = styled.li`
  /* */
  color: #969595;
`;

const Card = ({ title, value }) => {
  return (
    <Flex width="100px" flexDirection="column">
      <Flex
        height="35px"
        borderRadius="8px"
        bg="#ECE8E8"
        alignItems="center"
        justifyContent="center"
        marginBottom="16px"
      >
        <Text fontSize="10px">{title}</Text>
      </Flex>
      <Flex justifyContent="center">
        <Text fontSize="12px">{value}</Text>
      </Flex>
    </Flex>
  );
};

//to be deleted
const Navbar = () => {
  return (
    <Flex
      height="65px"
      width="100%"
      bg="#F6F7F9"
      alignItems="center"
      paddingLeft="20px"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <PrifinaLogo className={"app-market"} />
    </Flex>
  );
};
const UserMenu = ({ children }) => {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      width="286px"
      position="fixed"
      bg="#F6F7F9"
      zIndex={1}
      alignItems="left"
      paddingTop={25}
    >
      {children}
    </Flex>
  );
};

const WidgetBox = ({
  title,
  installed,
  installWidget,
  id,
  shortDescription,
  installedWidget,
  onClick,
  settings,
  ...props
}) => {
  console.log("PROPS ", id, installed, title, installedWidget, props);
  return (
    <WidgetBase onClick={onClick}>
      <Flex width={"73px"} justifyContent={"center"}>
        <DefaultWidget width={"42px"} height={"42px"} />
      </Flex>
      <Flex width={"237px"} flexDirection={"column"}>
        <Flex flexDirection={"row"}>
          <StyledText textStyle={"body"} fontWeight={"semiBold"}>
            {title}
          </StyledText>
          <Flex width={"100%"} justifyContent={"flex-end"}>
            {installedWidget > -1 && <InstalledText>Installed</InstalledText>}
            {installedWidget === -1 && (
              <InstallButton
                onClick={e => {
                  installWidget(e, id, settings);
                }}
              >
                Install
              </InstallButton>
            )}
          </Flex>
        </Flex>
        <StyledDescription textStyle={"caption"} mt={"16px"}>
          {shortDescription}
        </StyledDescription>
      </Flex>
    </WidgetBase>
  );
};

WidgetBox.propTypes = {
  title: PropTypes.string,
  installed: PropTypes.bool,
  installWidget: PropTypes.func,
  id: PropTypes.string,
  shortDescription: PropTypes.string,
  installedWidget: PropTypes.number,
};
const AppMarket = ({ GraphQLClient, prifinaID, ...props }) => {
  console.log("APP MARKET PROPS ", props);
  //const [widgets, setWidgets] = useState({});
  const widgets = useRef({});
  const [installedWidgets, setInstalledWidgets] = useState([]);

  useEffect(() => {
    listAppMarketQuery(GraphQLClient, { filter: { appType: { lt: 3 } } }).then(
      res => {
        //getPrifinaWidgetsQuery(GraphQLClient, "WIDGETS").then(res => {
        //const widgetData = JSON.parse(res.data.getPrifinaApp.widgets);
        const widgetData = res.data.listAppMarket.items;

        //console.log(widgetData);
        let availableWidgets = {};
        /*
      Object.keys(widgetData).forEach(w => {
        if (!widgetData[w].hasOwnProperty("restricted")) {
          availableWidgets[widgetData[w].name] = {
            title: widgetData[w].title,

            installed: false,
          };
        }
      });
      */
        widgetData.forEach(item => {
          const manifest = JSON.parse(item.manifest);
          let theme = "dark";
          let size = "300x300";
          let defaultSettings = [
            { field: "size", size },
            { field: "theme", theme },
          ];

          if (item.settings && item.settings.length > 0) {
            item.settings.forEach(s => {
              if (s.field === "sizes") {
                defaultSettings[0] = {
                  field: "size",
                  value: JSON.parse(s.value)[0].value,
                };
                //"[{\"option\":\"300x300\",\"value\":\"300x300\"}]"
              } else if (s.field === "theme") {
                defaultSettings[1] = {
                  field: "theme",
                  value: JSON.parse(s.value)[0].value,
                };
              } else {
                defaultSettings.push({ field: s.field, value: s.value });
              }
            });
          }

          availableWidgets[item.id] = {
            title: item.title,
            installed: false,
            settings: defaultSettings,
            publisher: manifest.publisher,
            icon: manifest.icon,
            bannerImage: manifest.bannerImage,
            description: manifest.description,
            shortDescription: manifest.shortDescription,
            longDescription: manifest.longDescription,
            dataTypes: manifest.dataTypes,
            category: manifest.category,
            deviceSupport: manifest.deviceSupport,
            languages: manifest.languages,
            age: manifest.age,
            screenshots: manifest.screenshots,
            keyFeatures: manifest.keyFeatures,
            userHeld: manifest.userHeld,
            userGenerated: manifest.userGenerated,
            public: manifest.public,
          };

          console.log("MANIFEST HEHE", manifest);
        });

        console.log("AVAILABLE WIDGETS ", availableWidgets);
        let currentInstalled = [];
        getPrifinaUserQuery(GraphQLClient, prifinaID).then(res => {
          if (
            res.data.getPrifinaUser.hasOwnProperty("installedWidgets") &&
            res.data.getPrifinaUser.installedWidgets !== null
          ) {
            const installedWidgets = JSON.parse(
              res.data.getPrifinaUser.installedWidgets,
            );
            installedWidgets.forEach(w => {
              //console.log(w, typeof availableWidgets[w.name]);
              //console.log(availableWidgets[w.name]);
              //availableWidgets[w].installed = true;
              if (availableWidgets.hasOwnProperty(w.id)) {
                availableWidgets[w.id].installed = true;
                currentInstalled.push(w.id);
              }
            });
            console.log(availableWidgets);
            widgets.current = availableWidgets;
            setInstalledWidgets(currentInstalled);
          } else {
            // no widgets installed....
            widgets.current = availableWidgets;
            setInstalledWidgets(currentInstalled);
          }
        });
      },
    );
  }, []);

  const installWidget = (e, id, settings) => {
    console.log("CLICK ", id);
    //console.log("INSTALL ", widgets);

    installWidgetMutation(GraphQLClient, prifinaID, {
      id: id,
      settings: settings,
      index: -1,
    }).then(res => {
      console.log("INSTALL ", res);

      //let availableWidgets = widgets.current;
      //availableWidgets[name].installed = true;
      widgets.current[id].installed = true;

      setInstalledWidgets(...installedWidgets, id);
    });
  };
  console.log(installedWidgets, widgets.current);

  const [allValues, setAllValues] = useState({
    title: "",
    shortDescription: "",
    icon: "",
    publisher: "",
    screenshots: [],
  });

  const [step, setStep] = useState(0);

  switch (step) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 3:
      break;
    default:
  }

  return (
    <>
      {step === 0 && (
        <>
          <GlobalStyle />
          <PrifinaLogo className={"app-market"} />
          <Box mt={"40px"} ml={"64px"}>
            <TitleText textStyle={"h4"}>Recommended for you</TitleText>
            <Flex mt={"24px"} flexDirection={"row"} flexWrap="wrap">
              {Object.keys(widgets.current).map(w => {
                return (
                  <WidgetBox
                    key={w}
                    id={w}
                    {...widgets.current[w]}
                    installWidget={installWidget}
                    installedWidget={installedWidgets.indexOf(w)}
                    onClick={() => {
                      setStep(1);
                      setAllValues({
                        ...allValues,
                        title: widgets.current[w].title,
                        publisher: widgets.current[w].publisher,
                        icon: widgets.current[w].icon,
                        bannerImage: widgets.current[w].bannerImage,
                        description: widgets.current[w].description,
                        shortDescription: widgets.current[w].shortDescription,
                        longDescription: widgets.current[w].longDescription,
                        dataTypes: widgets.current[w].dataTypes,
                        category: widgets.current[w].category,
                        deviceSupport: widgets.current[w].deviceSupport,
                        languages: widgets.current[w].languages,
                        age: widgets.current[w].age,
                        screenshots: widgets.current[w].screenshots,
                        keyFeatures: widgets.current[w].keyFeatures,
                        userHeld: widgets.current[w].userHeld,
                        userGenerated: widgets.current[w].userGenerated,
                        public: widgets.current[w].public,
                      });
                    }}
                  />
                );
              })}
            </Flex>
          </Box>
        </>
      )}
      {step === 1 && (
        <>
          <Navbar />
          <UserMenu />
          <Flex
            width="100%"
            height="100%"
            paddingLeft="286px"
            bg="white"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              width="100%"
              height="71px"
              alignItems="center"
              paddingLeft="64px"
            >
              <TextButton
                onClick={() => {
                  setStep(0);
                }}
              >
                <BlendIcon iconify={lefArrow} size="12px" />
                Widgets Directory
              </TextButton>
            </Flex>
            <Image
              src={allValues.bannerImage}
              alt={"Image"}
              shape={"square"}
              style={{ filter: "blur(1.5px)" }}
            />
            <Flex
              alt="innerContainer"
              marginTop={-120}
              borderRadius="8px"
              width="1026px"
              height="auto"
              bg="white"
              boxShadow="0px 0px 16px rgba(74, 77, 79, 0.25)"
              flexDirection="column"
              marginBottom="82px"
              paddingLeft="40px"
              paddingRight="40px"
              paddingBottom="30px"
              zIndex={0}
            >
              <Flex
                alt="topContainer"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                paddingTop="32px"
                paddingBottom="24px"
              >
                <Flex alt="leftSide" alignItems="center">
                  <Image
                    src={allValues.icon}
                    alt={"Image"}
                    shape={"square"}
                    width={57}
                  />
                  <Flex flexDirection="column" marginLeft="16px">
                    <Flex alignItems="center">
                      <Text fontSize="24px" bold marginRight="24px">
                        {allValues.title}
                      </Text>
                      <Badge>Widget</Badge>
                    </Flex>
                    <Flex paddingTop="8px">
                      <Text marginRight="18px" color="#969595" fontSize="12px">
                        {allValues.publisher}
                      </Text>
                      <Text color="#969595" fontSize="12px">
                        {allValues.category}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alt="rightSide">
                  <OutlineButton variation="outline">Report bug</OutlineButton>
                  <OutlineButton variation="outline" marginLeft="16px">
                    Support
                  </OutlineButton>
                  <Button disabled marginLeft="16px">
                    Install
                  </Button>
                </Flex>
              </Flex>
              <Flex alt="buttons" marginBottom="40px">
                <UnderlineButton
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Widget Details
                </UnderlineButton>
                <UnderlineButton
                  style={{
                    color: "#ADADAD",
                    borderBottom: "2px solid #ADADAD",
                  }}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Data requirements
                </UnderlineButton>
              </Flex>
              <Flex alt="bottomContainer" justifyContent="space-between">
                <Flex
                  alt="leftSide"
                  flexDirection="column"
                  // paddingRight="113px"
                  width="549px"
                >
                  <Flex alt="widgetInfo" alignItems="center">
                    <Text marginRight="24px" fontSize="18px">
                      {allValues.title}
                    </Text>
                    {/* temproray */}
                    <Box
                      width="117px"
                      height="30px"
                      bg="#B2F5EA"
                      textAlign="center"
                      lineHeight="30px"
                      fontSize="10px"
                      color="#00A3C4"
                    >
                      User Held
                    </Box>
                  </Flex>
                  <Text fontSize="12px" color="#969595">
                    {allValues.publisher}
                  </Text>
                  <Text fontSize="14px">{allValues.shortDescription}</Text>
                  <Flex
                    alt="requirementCards"
                    paddingTop="32px"
                    marginBottom="40px"
                    justifyContent="space-between"
                  >
                    <Card title="Data types" value={allValues.dataTypes} />
                    <Card title="Category" value={allValues.category} />
                    <Card
                      title="Device support"
                      value={allValues.deviceSupport}
                    />
                    <Card title="Languages" value={allValues.languages} />
                    <Card title="App Appropriate" value={allValues.age} />
                  </Flex>
                  <Text color="#969595" fontSize="14px" marginBottom="16px">
                    {allValues.longDescription}
                  </Text>
                  <Flex alt="features" flexDirection="column">
                    <Text color="#969595" fontSize="14px" marginBottom="8px">
                      Features
                    </Text>
                    <OrderedList>
                      {allValues.keyFeatures.map(item => {
                        return (
                          <ListItem fontSize="14px" color="#969595">
                            {item}
                          </ListItem>
                        );
                      })}
                    </OrderedList>
                  </Flex>
                </Flex>
                <Flex alt="rightSide" flexDirection="column">
                  {allValues.screenshots.map((item, index) => {
                    return (
                      <Box width="284px" height="213px" marginBottom="16px">
                        <Image key={index} src={item} />
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

AppMarket.propTypes = {
  GraphQLClient: PropTypes.object,
  prifinaID: PropTypes.string,
};
AppMarket.displayName = "AppMarket";

export default AppMarket;
