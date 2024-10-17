import React from 'react'
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import love6piller from "../../assets/images/love6piller.png";
export default function SectionOfSixPiller() {
  return (
<>
    <Grid
    container
    direction="row"
    flexShrink={0}
    rowSpacing={3}
    sx={{
      position: "relative",
      overflowY: "auto",
      maxHeight: {
        xs: "620px",
        sm: "784px",
        md: "620px",
        lg: "620px",
        xl: "620px",
      },
      marginBottom: "80px",
      scrollbarWidth: "none",
      display: { xs: "none", sm: "none", md: "block" },
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
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Syne",
          fontSize: { xs: "24px", sm: "30px", md: "40px" },
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "120%",
          marginBottom: "40px",
        }}
      >
        The 6 Pillars
      </Typography>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FFB892",
        borderRadius: "36px",
        padding: { xs: "18px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Love
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Love is the heart of LYFERS, the bedrock of its six guiding
            principles. It's like the soil that lets the others grow. The
            love we talk about here is boundless, selfless, and heavenly.
            It's the kind that never tires of giving and sacrificing for
            others. Love is fresh like youth, forgiving like a gentle
            breeze, empowering like a guiding light, resilient like a
            sturdy tree, and strong like a mountain.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Love"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FFA16D",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <img
            src={love6piller}
            alt="Youthful"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Youthful
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Youthfulness is the catalyst for a happy soul. It is the key
            organic ingredient within that translates to a long-lasting
            and healthy life. Youthfulness also allows us to keep our
            sense of playfulness and humor, which socially attract others.
            It keeps us active and alive, and therefore could be
            considered the gateway to the mysterious, yet resourceful,
            Fountain of Youth!
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FF8949",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Forgiving
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "14px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Forgiveness is essential to relieving our hearts and minds of
            heavy burdens and tragedies that have occurred throughout our
            lives. It frees us from negative thoughts and emotions that
            adversely impact our health, both spiritually and mentally.
            Forgiveness teaches us that we are not perfect and that
            mistakes, no matter their severity, are bound to be made.
            Finally, forgiveness has been the ultimate declaration of
            humility and love throughout the history of mankind.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Forgiving"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FAA217",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <img
            src={love6piller}
            alt="Empowering"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Empowering
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Empowering others is essential to empowering oneself. It gives
            a sense of purpose and belonging and showcases that our
            existence, in fact, matters. The positive energy empowerment
            exudes becomes our essential fuel to feed off when times are
            difficult, and gives us the added boost necessary to push
            through the same.
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FCC061",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Resilient
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Resilience is the unwavering spirit to rise above adversity,
            the strength to overcome obstacles, and the courage to keep
            moving forward despite setbacks. It's about embracing
            challenges, learning from failures, and transforming struggles
            into growth opportunities. Each time you bounce back, you
            build a foundation of strength that propels you toward
            success.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Resilient"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="30px"
      sx={{
        backgroundColor: "#FDD089",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={love6piller}
            alt="Strong"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Strong
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Strength for the purpose of LYFERS is to build, support, and
            uplift others through physical, emotional, and mental
            fortitude. It's about being the rock for others when they need
            it most and leading by example. True strength encompasses the
            ability to remain steadfast in the face of adversity and to
            inspire others through our resilience and courage.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Grid
    container
    direction="row"
    flexShrink={0}
    rowSpacing={3}
    sx={{
      position: "relative",
      overflowY: "auto",
      maxHeight: {
        xs: "620px",
        sm: "784px",
        md: "620px",
        lg: "620px",
        xl: "620px",
      },
      marginBottom: "80px",
      scrollbarWidth: "none",
      display: { xs: "block", sm: "block", md: "none" },
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
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Syne",
          fontSize: { xs: "24px", sm: "30px", md: "40px" },
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "120%",
          marginBottom: "40px",
        }}
      >
        The 6 Pillars
      </Typography>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FFB892",
        borderRadius: "36px",
        padding: { xs: "18px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Love"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Love
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Love is the heart of LYFERS, the bedrock of its six guiding
            principles. It's like the soil that lets the others grow. The
            love we talk about here is boundless, selfless, and heavenly.
            It's the kind that never tires of giving and sacrificing for
            others. Love is fresh like youth, forgiving like a gentle
            breeze, empowering like a guiding light, resilient like a
            sturdy tree, and strong like a mountain.
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FFA16D",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <img
            src={love6piller}
            alt="Youthful"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Youthful
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Youthfulness is the catalyst for a happy soul. It is the key
            organic ingredient within that translates to a long-lasting
            and healthy life. Youthfulness also allows us to keep our
            sense of playfulness and humor, which socially attract others.
            It keeps us active and alive, and therefore could be
            considered the gateway to the mysterious, yet resourceful,
            Fountain of Youth!
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FF8949",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Forgiving"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Forgiving
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "14px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Forgiveness is essential to relieving our hearts and minds of
            heavy burdens and tragedies that have occurred throughout our
            lives. It frees us from negative thoughts and emotions that
            adversely impact our health, both spiritually and mentally.
            Forgiveness teaches us that we are not perfect and that
            mistakes, no matter their severity, are bound to be made.
            Finally, forgiveness has been the ultimate declaration of
            humility and love throughout the history of mankind.
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FAA217",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <img
            src={love6piller}
            alt="Empowering"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Empowering
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Empowering others is essential to empowering oneself. It gives
            a sense of purpose and belonging and showcases that our
            existence, in fact, matters. The positive energy empowerment
            exudes becomes our essential fuel to feed off when times are
            difficult, and gives us the added boost necessary to push
            through the same.
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="20px"
      sx={{
        backgroundColor: "#FCC061",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="end"
        >
          <img
            src={love6piller}
            alt="Resilient"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Resilient
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Resilience is the unwavering spirit to rise above adversity,
            the strength to overcome obstacles, and the courage to keep
            moving forward despite setbacks. It's about embracing
            challenges, learning from failures, and transforming struggles
            into growth opportunities. Each time you bounce back, you
            build a foundation of strength that propels you toward
            success.
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    <Grid
      item
      xs={12}
      marginBottom="30px"
      sx={{
        backgroundColor: "#FDD089",
        borderRadius: "36px",
        padding: { xs: "20px", sm: "30px", md: "40px" },
        position: "sticky",
        top: { xs: 100, sm: 100, md: 145 },
      }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={love6piller}
            alt="Strong"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "800px",
              maxHeight: "360px",
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            alignSelf="stretch"
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "120%",
            }}
          >
            Strong
          </Typography>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "120%",
              textAlign: "justify",
            }}
          >
            Strength for the purpose of LYFERS is to build, support, and
            uplift others through physical, emotional, and mental
            fortitude. It's about being the rock for others when they need
            it most and leading by example. True strength encompasses the
            ability to remain steadfast in the face of adversity and to
            inspire others through our resilience and courage.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  </>
    )
}
