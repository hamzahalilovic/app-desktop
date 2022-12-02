/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { graphqlOperation, Auth as COGNITO, API as GRAPHQL } from "aws-amplify";

// import Amplify, { Auth, API as GRAPHQL } from "aws-amplify";

import { cognitoMetric } from "./mocks/images";
import { cognitoMetricJSON, cognitoDetails } from "./mocks/data";

import config from "../config";

const AppSyncConfig = {};

const APIConfig = {
  aws_appsync_graphqlEndpoint: config.appSync.aws_appsync_adminEndpoint,
  aws_appsync_region: config.main_region,
  aws_appsync_authenticationType: config.appSync.aws_appsync_authenticationType,
};

// const AuthConfig = {};

const AUTHConfig = {
  // To get the aws credentials, you need to configure
  // the Auth module with your Cognito Federated Identity Pool
  mandatorySignIn: false,
  userPoolId: config.cognito.USER_POOL_ID,
  identityPoolId: config.cognito.IDENTITY_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  region: config.auth_region,
  identityPoolRegion: config.main_region,
  // region: config.main_region,
  // authenticationFlowType: "CUSTOM_AUTH",
};

const currentSession = {
  idToken: {
    jwtToken: "eyJraWQiOiJ1RFFlcHVrUDdNTmNabWtKcitqc0JaWGNsaXNYK2RqdUh6S0hMblZuNHI4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmNjQwMTI3NC1lNWEwLTQzMTQtODc1ZS1iNGUwZGRiNThkMDgiLCJjb2duaXRvOmdyb3VwcyI6WyJVU0VSIiwiREVWIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjdXN0b206aWRlbnRpdHlQb29sIjoiZXUtd2VzdC0xOjU3NjZmNGI3LTAwNDMtNGE2ZC04Yzg1LTBlY2JkNzk1MmMyMiIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3V3eTNSMTJGTSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InRlc3RVc2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdC11c2VyIiwib3JpZ2luX2p0aSI6Ijc1NDE0MTUyLTRhMjUtNGQ3Yi1iYTQ5LWZiMTJjMzBlN2E3OSIsImF1ZCI6IjJ2aDRjbmo5a3NsMzRxNnZ1NW81NnRyaGJpIiwiZXZlbnRfaWQiOiIwNTNjZWQ1My05MGI1LTQ4MWEtYTU5My0xOTkxMDM1MDQ0ZWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2NzU2MjM4MSwiY3VzdG9tOnByaWZpbmEiOiI2MTQ1YjNhZjA3ZmEyMmY2NjQ1NmUyMGVjYTQ5ZTk4YmZlMzUiLCJwaG9uZV9udW1iZXIiOiIrMzU4MTIzNDU2NzgiLCJleHAiOjE2NjgwNjAyMDcsImlhdCI6MTY2ODA1NjYwNywianRpIjoiMjQyN2FlMmUtNmJkMy00NWY0LWFjOWEtOGY2NjY4ZTcyODE0IiwiZW1haWwiOiJ0cm85OTk5K2FscGhhLXRlc3RAZ21haWwuY29tIn0.WY-C4FWFkdIUkezAywbj5rV9C1CVf-Viq3s6PfnyiGu4caxMKcmi5Gb5XrNp9W8rz0ZttljfUI8oNmMMym1Rfvxv20sr0UjsFsOIAYmucOwXHqwX2vgcZIWbIj2LtpY9iiIFHYSFe13wwM3BIOr377u2RIATwy5umoy5m_KfwmID42zlvSU1rRLK3VrntGbiKqm7wn-8E443OJ_EvcK-M6Eme2urTyjsU-JEanRQqDy8lmbPhW4Ij9Cg8ZeC91GdAXivtl9VE--kUC13TkjUwB4wm-rCZe29nvKutxVrPo5uSGBG9DZ15BxJGtz9w-qdN6YCHZqxsZNeCUlIDz1fyw",
    payload: {
      sub: "f6401274-e5a0-4314-875e-b4e0ddb58d08",
      "cognito:groups": [
        "USER",
        "DEV",
      ],
      email_verified: true,
      "custom:identityPool": "eu-west-1:5766f4b7-0043-4a6d-8c85-0ecbd7952c22",
      iss: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_uwy3R12FM",
      phone_number_verified: true,
      "cognito:username": "testUser",
      preferred_username: "test-user",
      origin_jti: "75414152-4a25-4d7b-ba49-fb12c30e7a79",
      aud: "2vh4cnj9ksl34q6vu5o56trhbi",
      event_id: "053ced53-90b5-481a-a593-1991035044eb",
      token_use: "id",
      auth_time: 1667562381,
      "custom:prifina": "6145b3af07fa22f66456e20eca49e98bfe35",
      phone_number: "+35812345678",
      exp: 1668060207,
      iat: 1668056607,
      jti: "2427ae2e-6bd3-45f4-ac9a-8f6668e72814",
      email: "tro9999+alpha-test@gmail.com",
    },
  },
  refreshToken: {
    token: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Qw8v_CqUg1UJD9UJRd1ega7a7Z4T8-nwui0nwkr1cbgMSf3lnOyeSgXD5iA_xtNSKbEN3W_u8pPOsRx06K3pEPbq8aar1QYHMvznBOzBmCiRmtll3_5srOzd5QYdkkSlDCxs0kef2OAqH5sgbwg2NEdjVWqic-GehbeN6cBq-R73b2jmNvP9qsN9rER2-INAQwVSAsSemasEojX_d03UJVkqpT_2ifuJHOvWo8o5Dw-phwQ-ZoUYfUrq5Mn6I3Fkeh6zwyAzsxKVcqdUXbIP_cPrG2LZA8g_3FqsvwO9dlAVB_eyQPJikq-Bj1u0i96HwLmkBXCKUgJgPzyb5RxfpQ.NPg_8ZMZjKzapnvD.la0rvJLNRguM0l3ethOZX8fDCVDfuBMWX4Q1g6VEP4RKImYV6N6ai_KBSsh-R5JCTxRtqbi253h3pa_OZRmwE6F_rJCZDEI6iujMAyD-VMhqudApxr-88PlFQNDNnADnMtKGYtUluPAkRHpbYzaheBPOOCCWW-wl6V_dUGm6mXXHPjsAOBg17RL_v5_GQQsUuW66le6AnArslXwrmJbUa8M8_nAHpt6_-lhpqgKin3AEpRyaidZRUS2pxfxlc2_TeRlMRYAbu3fS2zLRbV3V1ofOiLuRe3xLBHbP8v3OLtinuQc_zex8vqlrDyP0x10hXOrGXl6ZIFisLvpAx_1o3hgdZEUeDBJyp7IFtytixCKcoWVjbm_rEmsnXj8Amw5wJ-oUQ4LWuOx87z6mVsjSy9ihASphvnhq2ZsjOMm5VzEafvpYcqs0LgQN783bgdQ3f7Co0y0bvJuzKTGVcKzeOFDuw1vIyaXYhTgGM6s1lc101-jzYsdmiVigkp5cM733QMc0ax2crD_zIl88WorO3eh09W0U_QG_yvB8rrNSCWgYqdhrguLfGynMk0gsa_KN_SQ1YJS0axg2jK7YVRx0UDiCP6TZSxX3EfWPqdFIr2sdgvcMRFSk9J-j-v1dY_kcgctXlb2GOblEtb7CmCq2syZyqmEFc6gMnCA3bsZWSGmQLJuKpbCVV_mLU8uCZhPtRcKppUVZ6wzYuQbkKh8N2eJnlWtmJaPktZ701bqSESxZy8BE61RuJ96Pwc50Lo9ckh5Gi7TcE-xBz7WQpeLniFilZhEG3YiBEfK-8Qx71fyLNAGWhukGbSi01oNu2g7u_K0mAhCY6Zwkjq3KOsfOQ5EZZiacJy6TYnZkvlhiddKn8xRdMcuYwNiqTmgeu9Qi361Bp16wVr70ssjcoE15fPP2graF7eVVVfngu2RqTVC9JwHte2UfBZEVk0Tz-0g8YZ1x_ZyJqtrkb0J7yhNDt2Fdz35kGfCHrnEsEf9eafe80Vk6sFhzOS6yhUqVb5vPJIGOB7TR3e_UrfNWdp5AeUQOM2RHL9-3olJ7r2u2gU_umdEzsGPj8ymphxLTOvufP4L1Y26kVDyAGJ3XIlheWoqpONBeD-Cy4TZDPbHCTe2UVQywwMvGVhlddwpEriBiD3pUcvP2G1Pwk7EfEr0EKU8O6-wO58GxZ0kguOWuODX4CsGfIYkHs1bc-R10T9oEv8qk8SkypiYXny_yyl-50Y6ZwG25rusvnnWUSnAfvu-M7uD95OIKTFIEeDKlymoLudoJk7Nb.Ay68VAkrE3CCIkA1e5Uhhw",
  },
  accessToken: {
    jwtToken: "eyJraWQiOiJTUHg0UENOVTFabytvMHUzSmVod1FleXpsWjVqOWN5VE1KWDdtUlFVdGR3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmNjQwMTI3NC1lNWEwLTQzMTQtODc1ZS1iNGUwZGRiNThkMDgiLCJjb2duaXRvOmdyb3VwcyI6WyJVU0VSIiwiREVWIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3V3eTNSMTJGTSIsImNsaWVudF9pZCI6IjJ2aDRjbmo5a3NsMzRxNnZ1NW81NnRyaGJpIiwib3JpZ2luX2p0aSI6Ijc1NDE0MTUyLTRhMjUtNGQ3Yi1iYTQ5LWZiMTJjMzBlN2E3OSIsImV2ZW50X2lkIjoiMDUzY2VkNTMtOTBiNS00ODFhLWE1OTMtMTk5MTAzNTA0NGViIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY2NzU2MjM4MSwiZXhwIjoxNjY4MDYwMjA3LCJpYXQiOjE2NjgwNTY2MDcsImp0aSI6IjM4MzcyYTQ0LTA1OTctNDJkMi1iYmY0LWI0M2FiMWQ1OGRmZCIsInVzZXJuYW1lIjoidGVzdFVzZXIifQ.WcERDUMrUWg1MWafLSrw9BxrMs3dxOY7WHEI8D_tfbAlqY_9yTd7olHD_jUAkMWpvqGTJRuXnrXbllEg3U6V_SWga_ee5yKGtwD7AwCT0-lSzCey7jnZjui4ct1SCSUvWpm9YY4OcYQBTdGLinNcGbn-CcNM2I89xGnbLzYfXXZ-izN7ekC_erbCXJ176ra1h-mRq6qp3FLtTqBl8nrfCzsjxn25l9UZIfgd754LnJ52k5u_vldnEwJB9riyh5r7_XGM5kk3GYtnkyxB6gBnMMRiKmX1TGQM92pKBdFboMK2OU6kYs7dNHdQkBprVodV0oBjloVLsAiMAZ8ZXfrXFQ",
    payload: {
      sub: "f6401274-e5a0-4314-875e-b4e0ddb58d08",
      "cognito:groups": [
        "USER",
        "DEV",
      ],
      iss: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_uwy3R12FM",
      client_id: "2vh4cnj9ksl34q6vu5o56trhbi",
      origin_jti: "75414152-4a25-4d7b-ba49-fb12c30e7a79",
      event_id: "053ced53-90b5-481a-a593-1991035044eb",
      token_use: "access",
      scope: "aws.cognito.signin.user.admin",
      auth_time: 1667562381,
      exp: 1668060207,
      iat: 1668056607,
      jti: "38372a44-0597-42d2-bbf4-b43ab1d58dfd",
      username: "testUser",
    },
  },
  clockDrift: 0,
};

const currentCreds = {
  accessKeyId: "ASIA24Z7JSHOEDGALFH2",
  secretAccessKey: "vy3SM88EnS1NRPLzOEPR1rvjFUJ2Xq2y1pHOIKtp",
  sessionToken: "IQoJb3JpZ2luX2VjEHUaCWV1LXdlc3QtMSJIMEYCIQCWODC1hKXlMLkwNSOBugkj0FnVzdno5rq8+AQPc6+YXQIhAID0GfSROEzgsOtj7gdq30S9FnXyXcQIdaKcHqO/lBMLKsQECG4QAhoMNzQ5MDY3NjY5OTgwIgwlGiQSdBBr/BVS3DkqoQSeYQsTo73aUvK35gg9MhLZvI9alPc2Kq6vq4k66Hj67NSWniwSIn7bTsLDSuPrXLUb24KwWBdbBV5uj+XaxCm7FlN3QrZjM0oee3/hBP+sQXPbXsxrbvPh0Fu4e0e3+rePGrH3T3irIED5EudqDMQaY4e4Ual5ECkvZQD2VyrIqoGgfrBhyyYH0Lodxzua+rHFJCGo09chSrkzcM9szWswFk6wNGXgDpjmvbMYxfuMpYKu1Ikfzc/sRzg9IFoFWpmg/uQz+PV7ceKNBaKw2On5sy3URZ1GepOFw6RiQ6kKjs0Ie/gFl32MPLkzhQ3zap9/d1IV3TU//nk9+TApOX0VqGopKnwgJhqRAD6UwTWTc/v86V0hDBWGus+y+1iochmxdsBgHWqwLNy58zUo33TE5SyH08m6bG0BezpcRoRoic/cegIzIowiRVrB7Q+VUqtyPJYzN3n3xSq+8olJDgrcmJz96zbURxHuGZ/4zzwPgsbF0Q1s2e5XJ9wkzBhuCI1Iz6/atQ/XOy2x4FwoGON9Z9JfgPltA+EpDNXNzP6iShYFNlXLcDHnlwT/Crus9zCHd70He54Rp1I/aBUb8OT5O81+f0qkOPVpKPKyKr9ftTMC4VKvLEPOJ0Dk4wsqajEghvmfJnTHF62P7IAToL5okmRuwN6bWF18gRiBEcL71MoBy4vHRDrcHvLSdWN/V5FSME+XUDqHhw7XuCiYHd1VgjCgjLKbBjqEAkS8m+tHTCkpWzrf/lZxK6O2kgh7dKNTALuFVTLukyKCraXdYGUJN79f2KdTvSMvAmqBYMcqz8vK7crCIMwAWQ0sS+OWnBhEUfl4QcKUsE2uGpv3wNeCatbMWdRcjza4RX+8HRBSeHoUeLzwnC01Q/IbivGJCRlrDoVcqc/FRZ/yLlaw9ZuELYYoFEBy6W8bvjG29wakspG2tMz338IBODdJpw3Vi4xcKNM/zo8z8tMgOeLBNag9Gf7kcn9BR6G1f+4klgbcHVJxFA8tk5UezpXzJTgpT/VbTO1DfSRfzAPsUl0vxfSH0TA3jT5XcTOUwYMFTrEwy7lPOdlJMJdeCrO68j8w",
  expiration: "2022-11-10T06:03:28.000Z",
  identityId: "eu-west-1:32f1d2fd-5d8e-4932-9d89-3e02e391a2d3",
  authenticated: true,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/*
data: getCognitoUserDetails: result:....

*/
const qlMockups = {
  query: {
    cognitoUserCount: variables => ({ data: { getCognitoUserCount: getRandomInt(55, 9999) } }),
    cognitoMetrics: () => ({ data: { getCognitoMetrics: { result: JSON.stringify(cognitoMetricJSON) } } }),
    cognitoMetricImage: () => ({ data: { getCognitoMetricImage: { result: cognitoMetric } } }),
    cognitoUserDetails: variables => {
      // could use variables to get "filtered" user
      const detailsJSON = JSON.parse(cognitoDetails);
      // UserCreateDate and UserLastModifiedDate are very long integers and converted to exp format...
      // detailsJSON.UserCreateDate = new Date(Math.trunc(detailsJSON.UserCreateDate) * 1000).toISOString();
      // detailsJSON.UserLastModifiedDate = new Date(Math.trunc(detailsJSON.UserLastModifiedDate) * 1000).toISOString();

      const cognitoAttributes = localStorage.getItem("_mockCognitoAttributes");
      if (cognitoAttributes != null) {
        // merge existing attributes...
        const storageAttributes = JSON.parse(cognitoAttributes);
        // updates = { ...storageAttributes, ...updates };
        detailsJSON.Attributes.forEach((attr, i) => {
          if (storageAttributes?.[attr.Name]) {
            detailsJSON.Attributes[i].Value = storageAttributes[attr.Name];
          }
          /* if (attr.Name === "preferred_username" && storageAttributes?.username) {
            detailsJSON.Attributes[i].Value = storageAttributes.username;
          } */
        });
      }

      return { data: { getCognitoUserDetails: { result: JSON.stringify(detailsJSON) } } };
    },
  },
  mutation: {
    updateCognitoUser: attrs => {
      // Note does not update username level attributes, only the current mockup object userName
      // const details = JSON.parse(cognitoDetails);
      // console.log(details, attrs);
      const cognitoAttributes = localStorage.getItem("_mockCognitoAttributes");
      // console.log("LOCAL ", cognitoAttributes);
      let updates = { [attrs.attrName]: attrs.attrValue };
      if (cognitoAttributes != null) {
        // merge existing attributes...
        const storageAttributes = JSON.parse(cognitoAttributes);
        updates = { ...storageAttributes, ...updates };
      }
      localStorage.setItem("_mockCognitoAttributes", JSON.stringify(updates));
      return true;
    },
  },
};

const Auth = {
  configure: authConfig => true,
};

/*
export const getVerificationQuery = (API, userCode) => {
  return API.graphql({
    query: getVerification,
    variables: { user_code: userCode },
    authMode: "AWS_IAM",
  });
};
*/
console.log("API CONFIG ", APIConfig);
GRAPHQL.configure(APIConfig);
// amplify graphql API mockup, uses authMode: "AMAZON_COGNITO_USER_POOLS"
const API = {
  configure: apiConfig => {
    if (config.MOCKUP_CLIENT) {
      return true;
    }
    GRAPHQL.configure(apiConfig);
    return true;
  },
  graphql: (
    query = undefined,
    variables = {},
    authMode = "AMAZON_COGNITO_USER_POOLS",
  ) => {
    console.log("API CLIENT ", config, config.MOCKUP_CLIENT);
    if (config.MOCKUP_CLIENT) {
      const ql = graphqlOperation(query, variables);
      // console.log("QL ", ql);
      // query:"mutation updateCognitoUser($attrName: String!, $attrValue: String!) {\n  \n  updateCognitoUser( attrName: $attrName, attrValue: $attrValue)\n}"
      const op = ql.query.split(" ")[0];
      const fn = ql.query.split(" ")[1].split("(")[0];
      return Promise.resolve(qlMockups[op][fn](ql.variables));
    }
    return GRAPHQL.graphql({ query, variables, authMode });
  },

};

// AppSync & Auth Client...
class GraphQLClient {
  constructor(cnf) {
    this.config = cnf || AppSyncConfig;
    this.Authconfig = AUTHConfig;
    this.client = "TEST";
    console.log("NEW Client ");
    COGNITO.configure(AUTHConfig);
  }

  AUTHconfigure(cnf) {
    this.AuthConfig = cnf;
    if (config.MOCKUP_CLIENT) {
      const result = Auth.configure(cnf);
      return result;
    }
    return COGNITO.configure(cnf);
  }

  APIconfigure(cnf) {
    this.config = cnf;
    const result = API.configure(cnf);
    return result;
  }

  signOut() {
    return Promise.resolve(true);
  }

  signUp() {
    return Promise.resolve(true);
  }

  signIn(uname, passwd) {
    if (config.MOCKUP_CLIENT) {
      return Promise.resolve(true);
    }
    console.log("SIGN IN ", uname);

    return COGNITO.signIn(uname, passwd);
  }

  sendCustomChallengeAnswer(user, answer) {
    if (config.MOCKUP_CLIENT) {
      return Promise.resolve(true);
    }
    // console.log("AUTH CONFIG", this.AuthConfig);
    return COGNITO.sendCustomChallengeAnswer(user, answer);
  }

  confirmSignIn() {
    return Promise.resolve(true);
  }

  setPreferredMFA() {
    return Promise.resolve(true);
  }

  currentCredentials() {
    return Promise.resolve(currentCreds);
  }

  currentSession() {
    // const _currentSession = await Auth.currentSession();
    if (config.MOCKUP_CLIENT) {
      // how to trigger unauthenticated mockup state...
      // return Promise.resolve(null);
      return Promise.resolve({
        ...currentSession,
        getIdToken: () => currentSession.idToken,
        getAccessToken: () => currentSession.accessToken,
        getRefreshToken: () => currentSession.refreshToken,
        isValid: true,
        getClockDrif: () => currentSession.clockDrift,
      });
    }
    return COGNITO.currentSession();
  }

  query(rq, vars) {
    // import gql from "graphql-tag";

    // const test = await appSyncClient.query({
    //   query: gql(getCognitoUserDetails),
    //   variables: {},
    // });
    return Promise.resolve(true);
  }

  mutation(rq, vars) {
    return Promise.resolve(true);
  }
}

export { GraphQLClient, API };
