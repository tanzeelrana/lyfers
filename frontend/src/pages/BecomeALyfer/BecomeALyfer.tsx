import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import coverImage from "../../assets/images/CoverImageBecomeAlyfer.png";
import shakeHand from "../../assets/images/shakeHand.png";
import handups from "../../assets/images/handup.png";
import heartLock from "../../assets/images/heartLock.png";
import love6piller from "../../assets/images/love6piller.png";
import { Carousel } from "react-responsive-carousel";
import productsCover from "../../assets/images/productsCover.png";
import SectionOfSixPiller from "./SectionOfSixPiller";

const BecomeALyfer = () => {
  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={11} md={11} lg={11} xl={9.2}>
          <Box
            borderRadius={{ xs: "20px", sm: "30px", md: "40px" }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexShrink={0}
            padding={{ xs: 2, sm: 4, md: 6 }}
            sx={{
              backgroundImage: `url(${coverImage})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: { xs: "200px", sm: "400px", md: "700px" },
              margin: "40px 0px",
            }}
          >
            <Box
              display="inline-flex"
              sx={{
                borderRadius: "1000px",
                padding: { xs: 1, sm: 1, md: 2 },
                backgroundColor: "#FAFAFA",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 60 60"
                fill="none"
              >
                <path
                  d="M51.235 19.9191L27.385 2.41907C25.5222 1.05503 23.3181 0.233555 21.0169 0.0457271C18.7158 -0.1421 16.4076 0.311061 14.3482 1.35496C12.2889 2.39886 10.5589 3.99271 9.35015 5.95978C8.14135 7.92685 7.50097 10.1903 7.5 12.4991V47.4991C7.50041 49.8089 8.14083 52.0735 9.35019 54.0414C10.5595 56.0094 12.2905 57.6037 14.3511 58.6476C16.4116 59.6914 18.721 60.144 21.0231 59.9549C23.3252 59.7658 25.5299 58.9426 27.3925 57.5766L51.2425 40.0766C52.8257 38.9156 54.1131 37.398 55.0005 35.6467C55.8879 33.8955 56.3504 31.9598 56.3504 29.9966C56.3504 28.0333 55.8879 26.0977 55.0005 24.3464C54.1131 22.5952 52.8257 21.0776 51.2425 19.9166L51.235 19.9191ZM48.275 36.0441L24.425 53.5441C23.3075 54.3606 21.9859 54.8521 20.6064 54.964C19.2269 55.0759 17.8434 54.8039 16.6089 54.1781C15.3744 53.5524 14.3372 52.5972 13.612 51.4184C12.8868 50.2396 12.5019 48.8831 12.5 47.4991V12.4991C12.4861 11.1124 12.8637 9.75002 13.5894 8.56838C14.3151 7.38673 15.3595 6.4338 16.6025 5.81907C17.6597 5.2813 18.8289 5.00036 20.015 4.99907C21.6047 5.00514 23.1505 5.52129 24.425 6.47157L48.275 23.9716C49.2237 24.6683 49.9952 25.5786 50.5269 26.6287C51.0586 27.6789 51.3356 28.8395 51.3356 30.0166C51.3356 31.1937 51.0586 32.3542 50.5269 33.4044C49.9952 34.4546 49.2237 35.3648 48.275 36.0616V36.0441Z"
                  fill="#0B0A0A"
                />
              </svg>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            display="flex"
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "32px", sm: "48px", md: "56px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
              }}
            >
              Become a LYFER
            </Typography>
          </Grid>

          {/* Section 2: Our Mission */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ xs: "16px", sm: "24px" }}
            padding={{ xs: "20px", sm: "30px", md: "40px" }}
            sx={{
              backgroundColor: "#FCC061",
              borderRadius: { xs: "20px", sm: "30px", md: "36px" },
              marginBottom: { xs: "10px", sm: "15px", md: "20px" },
              margin: "40px 0px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "24px", sm: "32px", md: "34px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                textAlign: "center",
              }}
            >
              Our Mission
            </Typography>
            <Typography
              alignSelf="stretch"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "16px", sm: "20px", md: "22px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                textAlign: "center",
              }}
            >
              To bring awareness around the positive effects of being “LYFERS”-
              Loving, Youthful, Forgiving, Empowering, Resilient and Strong!
            </Typography>
          </Grid>

          {/* Section 3: Our Vision */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ xs: "16px", sm: "24px" }}
            padding={{ xs: "20px", sm: "30px", md: "40px" }}
            sx={{
              backgroundColor: "#FFA16D",
              borderRadius: { xs: "20px", sm: "30px", md: "36px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "24px", sm: "32px", md: "34px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                textAlign: "center",
              }}
            >
              Our Vision
            </Typography>
            <Typography
              alignSelf="stretch"
              sx={{
                fontFamily: "Outfit",
                fontSize: { xs: "16px", sm: "20px", md: "22px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                textAlign: "center",
              }}
            >
              Our vision is to lead global advocacy and education on the six
              core principles of LYFERS.
            </Typography>
          </Grid>

          {/* Section 4: Illuminating The World */}
          <Box
            sx={{
              display: {
                md: "none",
                sm: "none",
                xs: "block",
                width: "100%",
                margin: "40px 0px",
              },
            }}
          >
            <Grid
              item
              xs={12}
              display="flex"
              sx={{
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Syne",
                  fontSize: { xs: "24px", sm: "32px", md: "40px" },
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "120%",
                  marginBottom: "50px",
                }}
              >
                Illuminating The World
              </Typography>
            </Grid>
            <Carousel
              autoPlay={true}
              showThumbs={false}
              swipeScrollTolerance={1}
              infiniteLoop={true}
              emulateTouch={true}
            >
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: "#E4626F",
                    borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                    padding: { xs: "20px", sm: "30px", md: "40px" },
                  }}
                >
                  <img
                    src={shakeHand}
                    alt="shakeHand image"
                    style={{
                      objectFit: "cover",
                      width:'37%'
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "24px", sm: "28px", md: "32px" },
                      fontWeight: 700,
                      padding: "16px",
                      lineHeight: "120%",
                    }}
                  >
                    Love without Limits
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: "#15B097",
                    borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                    padding: { xs: "20px", sm: "30px", md: "40px" },
                  }}
                >
                  <img
                    src={handups}
                    alt="handups image"
                    style={{
                      objectFit: "cover",
                      width:'37%'
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "24px", sm: "28px", md: "32px" },
                      fontWeight: 700,
                      padding: "16px",
                      lineHeight: "120%",
                    }}
                  >
                    Youthful in Spirit
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: "#EDA145",
                    borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                    padding: { xs: "20px", sm: "30px", md: "40px" },
                  }}
                >
                  <img
                    src={heartLock}
                    alt="heartLock image"
                    style={{
                      objectFit: "cover",
                      width:'37%'
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: { xs: "24px", sm: "28px", md: "32px" },
                      fontWeight: 700,
                      padding: "16px",
                      lineHeight: "120%",
                    }}
                  >
                    Forgiving and Free
                  </Typography>
                </Box>
              </Grid>
            </Carousel>
          </Box>
          <Grid
            item
            xs={12}
            sx={{
              margin: "40px 0px",
              display: {
                sm: "block",
                xs: "none",
              },
            }}
          >
            <Grid container direction="column" flexShrink={0}>
              <Grid
                item
                xs={12}
                display="flex"
                sx={{
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Syne",
                    fontSize: { xs: "24px", sm: "32px", md: "40px" },
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "120%",
                    marginBottom: "50px",
                  }}
                >
                  Illuminating The World
                </Typography>
              </Grid>

              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                justifyContent="center"
              >
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      backgroundColor: "#E4626F",
                      borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                      padding: { xs: "20px", sm: "30px", md: "40px" },
                    }}
                  >
                    <img
                      src={shakeHand}
                      alt="shakeHand image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: { xs: "24px", sm: "22px", md: "32px" },
                        fontWeight: 700,
                        padding: "16px",
                        lineHeight: "120%",
                      }}
                    >
                      Love without Limits
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      backgroundColor: "#15B097",
                      borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                      padding: { xs: "20px", sm: "30px", md: "40px" },
                    }}
                  >
                    <img
                      src={handups}
                      alt="handups image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: { xs: "24px", sm: "22px", md: "32px" },
                        fontWeight: 700,
                        padding: "16px",
                        lineHeight: "120%",
                      }}
                    >
                      Youthful in Spirit
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      backgroundColor: "#EDA145",
                      borderRadius: { xs: "20px", sm: "30px", md: "36px" },
                      padding: { xs: "20px", sm: "30px", md: "40px" },
                    }}
                  >
                    <img
                      src={heartLock}
                      alt="heartLock image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Outfit",
                        fontSize: { xs: "24px", sm: "22px", md: "32px" },
                        fontWeight: 700,
                        padding: "16px",
                        lineHeight: "120%",
                      }}
                    >
                      Forgiving and Free
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <SectionOfSixPiller />
      </Container>
    </>
  );
};

export default BecomeALyfer;
