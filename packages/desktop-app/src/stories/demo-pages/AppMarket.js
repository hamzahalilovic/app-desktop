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
import { Box, Flex, Text, Button, Image, Divider } from "@blend-ui/core";

import { PrifinaLogo } from "../../components/PrifinaLogo";

import { ReactComponent as DefaultWidget } from "../../assets/third-party-app.svg";

//data requirements page

import healthData from "../assets/app-market/health-data.png";
import viewingData from "../assets/app-market/viewing-data.png";

import bxsCheckCircle from "@iconify/icons-bx/bxs-check-circle";
import bxsXCircle from "@iconify/icons-bx/bxs-x-circle";
import lefArrow from "@iconify/icons-bx/bxs-chevron-left";

import backgroundImage from "../assets/app-market/background-image.png";
import appMarketBanner from "../assets/app-market/app-market-banner.png";

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

  function userHeldData() {
    const newData = allValues.userHeld.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }

  function userGeneratedData() {
    const newData = allValues.userGenerated.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }
  function publicData() {
    const newData = allValues.public.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }

  return (
    <>
      {step === 0 && (
        <>
          <GlobalStyle />
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
              height="316px"
              bg="#EBF3FF"
              width="100%"
              justifyContent="space-between"
              paddingLeft="40px"
              paddingRight="40px"
              paddingTop="32px"
              paddingBottom="32px"
            >
              <Flex
                flexDirection="column"
                marginRight="143px"
                paddingTop="62px"
              >
                <Text fontSize="28px" color="#639AED" marginBottom="24px">
                  Data on your side
                </Text>
                <Text fontSize="16px" color="#639AED">
                  Free your data from its silos and utilize it in different apps
                  and widgets. Like a key, your data can unlock valuable
                  experiences and insights. By using your data directly, you
                  capture the value and open a new market of apps.
                </Text>
              </Flex>
              <Image src={appMarketBanner} />
            </Flex>

            <Box mt={"40px"} ml={"64px"}>
              <TitleText textStyle={"h4"}>Category</TitleText>
              <Text textStyle={"h6"}>
                This section features all the widgets which require user-held
                data
              </Text>
              <Flex mt={"24px"} flexDirection={"row"} flexWrap="wrap">
                {Object.keys(widgets.current).map(w => {
                  console.log("HEEEEE", widgets.current);
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
          </Flex>
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
              //   src={allValues.bannerImage}
              src={backgroundImage}
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
      {step === 2 && (
        <>
          <Navbar />
          <UserMenu
          // children={
          //   <ul>
          //     <div>Market</div>
          //     <div>Applications</div>
          //     <div>Widgets</div>
          //   </ul>
          // }
          />
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
              //   src={allValues.bannerImage}
              src={backgroundImage}
              alt={"Image"}
              shape={"square"}
              style={{ filter: "blur(1.5px)" }}
            />
            <Flex
              alt="innerContainer"
              marginTop={-120}
              borderRadius="8px"
              minWidth="1026px"
              bg="white"
              boxShadow="0px 0px 16px rgba(74, 77, 79, 0.25)"
              flexDirection="column"
              marginBottom="82px"
              marginLeft="64px"
              marginRight="64px"
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
                // minHeight="88px"
                paddingTop="32px"
                paddingBottom="24px"
                // marginBottom="20px"
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
              {/* temporary */}
              {/* <Flex
                bg="#FFF8E0"
                justifyContent="space-between"
                paddingTop="28px"
                paddingBottom="28px"
                paddingLeft="17"
                paddingRight="28px"
              >
                <Text color="#E8B607">
                  This widget requires health and viewing data to operate
                </Text>
                <Text color="#E8B607">Connect Data</Text>
              </Flex> */}
              <Flex alt="buttons" marginBottom="38px">
                <UnderlineButton
                  style={{
                    color: "#ADADAD",
                    borderBottom: "2px solid #ADADAD",
                  }}
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Widget Details
                </UnderlineButton>
                <UnderlineButton
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Data requirements
                </UnderlineButton>
              </Flex>
              <Flex
                alt="dataRequirements"
                paddingLeft="7px"
                paddingRight="20px"
                marginBottom="25px"
                justifyContent="space-between"
              >
                <Flex alt="leftSide" flexDirection="column" width="480px">
                  <Flex alignItems="center" marginBottom="13px">
                    <Text marginRight="24px" fontSize="18px">
                      Data Requirements
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
                  <Text fontSize="14px" color="#969595">
                    Some products on Prifina are powered by ‘user-held’ data
                    which they pull from your data cloud, if the data is not
                    available in your cloud they can’t run. Select from sources
                    below to add the data
                  </Text>
                  <Flex
                    justifyContent="space-between"
                    paddingTop="32px"
                    paddingBottom="31px"
                  >
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        User-held
                      </Text>
                      {userHeldData()}
                    </Flex>
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        User-generated
                      </Text>
                      {userGeneratedData()}
                    </Flex>
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        Public
                      </Text>
                      {publicData()}
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alt="rightSide">
                  <Image
                    src={allValues.dataConnectionsImage}
                    style={{
                      width: "284px",
                      height: "213px",
                    }}
                  />
                </Flex>
              </Flex>

              <Divider as={"div"} color="#F2F4F5" height={"1px"} />
              <Flex alt="addData" paddingTop="32px" paddingBottom="40px">
                <Flex flexDirection="column" marginRight="190px">
                  <Flex paddingBottom="8px">
                    <Image src={healthData} alt={"Image"} shape={"square"} />
                    <Text marginLeft="8px">Add health data to your cloud</Text>
                  </Flex>
                  <Text color="#969595">
                    Select from available sources to add
                  </Text>
                  <Flex paddingTop="31px">
                    <Box
                      height="44px"
                      width="44px"
                      borderRadius="8.8px"
                      bg="grey"
                    />
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Flex paddingBottom="8px">
                    <Image src={viewingData} alt={"Image"} shape={"square"} />
                    <Text marginLeft="8px">Add viewing data to your cloud</Text>
                  </Flex>
                  <Text color="#969595">
                    Select from available sources to add
                  </Text>
                  <Flex paddingTop="31px">
                    <Box
                      height="44px"
                      width="44px"
                      borderRadius="8.8px"
                      bg="grey"
                    />
                  </Flex>
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
