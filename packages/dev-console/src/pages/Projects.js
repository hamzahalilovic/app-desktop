import React, { useState, useMemo, useCallback, useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Link,
  Divider,
  Input,
  Radio,
  TextArea,
  useTheme,
} from "@blend-ui/core";

import { Tabs, Tab, TabList, TabPanel, TabPanelList } from "@blend-ui/tabs";

import { TagInput } from "@blend-ui/tag-input";

import {
  updateAppVersionMutation,
  deleteAppVersionMutation,
  listDataSourcesQuery,
  i18n,
  useAppStudioContext,
  listAppsQuery,
  useAppContext,
} from "@prifina-apps/utils";

import { API as GRAPHQL } from "aws-amplify";

import config from "../config";

import PropTypes from "prop-types";
import { BlendIcon } from "@blend-ui/icons";

import * as C from "../components/components";

import { useToast } from "@blend-ui/toast";

import styled from "styled-components";

import mdiArrowLeft from "@iconify/icons-mdi/arrow-left";
import hazardSymbol from "@iconify/icons-mdi/warning";
import successTick from "@iconify/icons-mdi/tick-circle";

import UploadAsset from "../components/UploadAsset";
import UploadFile from "../components/UploadFile";

import {
  AddRemoveDataSources,
  ControlAddedDataSources,
  DataSourceForm,
  ApiForm,
} from "../components/helper";

const ImageZoomContainer = styled(Image)`
  transition: transform 0.2s;

  height: 142px;
  &:hover {
    transform: scale(1.5, 1.5);
  }
  cursor: pointer;
`;

const ImageZoom = ({ src }) => {
  return (
    <ImageZoomContainer
      src={src}
      height="150px"
      onError={e => (e.target.style.display = "none")}
      onClick={() => {
        window.open(src);
      }}
    />
  );
};

ImageZoom.propTypes = {
  src: PropTypes.string,
};

const Projects = ({ ...props }) => {
  const { colors } = useTheme();

  const navigate = useNavigate();

  return <></>;
};

Projects.propTypes = {
  allValues: PropTypes.object,
  // setStep: PropTypes.func,
};

Projects.displayName = "Projects";
export default Projects;
