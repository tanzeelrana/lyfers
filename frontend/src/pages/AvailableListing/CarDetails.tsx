import { Button, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import logo from "../../assets/images/front.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FactoryIcon from "@mui/icons-material/Factory";
import back from "../../assets/images/back.png";
import leftSide from "../../assets/images/leftSide.png";
import seats from "../../assets/images/seats.png";
import rightSide from "../../assets/images/rightSide.png";
import stairing from "../../assets/images/Stairing.png";
import inside from "../../assets/images/inside.png";
import front from "../../assets/images/front.png";
import engine from "../../assets/images/engine.png";
import Divider from "@mui/material/Divider";
import frontSeats from "../../assets/images/frontSeats.png";
import backSeats from "../../assets/images/backSeats.png";
import rightInsideDoor from "../../assets/images/rightInsideDoor.png";
import PlaceIcon from "@mui/icons-material/Place";
import ThreePIcon from "@mui/icons-material/ThreeP";
import frontRightTyre from "../../assets/images/frontRightTyre.png";
import frontLeftTyre from "../../assets/images/frontLeftTyre.png";
import backLeftTyre from "../../assets/images/backLeftTyre.png";
import backRightTyre from "../../assets/images/backRightTyre.png";
import TextField from "@mui/material/TextField";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputAdornment from "@mui/material/InputAdornment";
import PercentIcon from "@mui/icons-material/Percent";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Container } from "@mui/system";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CarDetails() {
  const itemData = [
    {
      img: front,
      title: "exterior",
    },
    {
      img: back,
      title: "exterior",
    },
    {
      img: leftSide,
      title: "exterior",
    },
    {
      img: rightSide,
      title: "exterior",
    },
    {
      img: stairing,
      title: "interior",
    },
    {
      img: rightInsideDoor,
      title: "inside",
    },
    {
      img: seats,
      title: "interior",
    },

    {
      img: engine,
      title: "engine",
    },
    
  ];

  const exteriorImgs = [
    {
      img: front,
      title: "exterior",
    },
    {
      img: back,
      title: "exterior",
    },
    {
      img: leftSide,
      title: "exterior",
    },
    {
      img: rightSide,
      title: "exterior",
    },
  ];

  const interiorImgs = [
    {
      img: stairing,
      title: "interior",
    },
    {
      img: seats,
      title: "interior",
    },
    {
      img: inside,
      title: "inside",
    },
    {
      img: frontSeats,
      title: "inside",
    },
    {
      img: backSeats,
      title: "inside",
    },
    
  ];

  const engineImgs = [
    {
      img: engine,
      title: "engine",
    },
  ];

  const tyreImgs = [
    {
      img: frontRightTyre,
      title: "frontRightTyre",
    },
    {
      img: frontLeftTyre,
      title: "frontLeftTyre",
    },
    {
      img: backRightTyre,
      title: "backRightTyre",
    },
    {
      img: backLeftTyre,
      title: "backLeftTyre",
    },
  ];

  const isLargeScreen = useMediaQuery('(min-width: 1199px)');


  return (
  <Container>
      <BreadCrumbs title="Available Listing" optionalProp="Car Details"></BreadCrumbs>
      <Box sx={{ display: 'flex', paddingBottom: '30px', flexGrow: 1, justifyContent: 'space-between' }}>
        <Box style={{ display: "flex", flexGrow: 1 }}>
          <BookmarkBorder sx={{ color: "lightgreen", fontSize: 30, cursor: "pointer", pr: '10px'  }} />
          <Typography sx={{ fontSize: 20, display: "flex",  pr: '10px' }}>
            <strong>BMW</strong>
          </Typography>
          <Typography sx={{ fontSize: 20, pr: '10px' }}>
            <strong>$5152</strong>
          </Typography>
        </Box>
        <Box sx={{display: 'flex'}}>
          <Button sx={{ backgroundColor: "lightgray", borderRadius: "0px", color: "black", mr: '5px',
              ":hover": {
                backgroundColor: "lightgray",
              },
            }}
            size="large"
            variant="text"
          >
            <ShareIcon sx={{ color: "green" }} />
            Share
          </Button>
          <Button
            sx={{ backgroundColor: "black", borderRadius: "0px",  color: "white", mr: '0px',
              ":hover": {
                backgroundColor: "black",
              },
            }}
            size="large"
            variant="text"
          >
            Contact Seller
          </Button>
        </Box>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: { xs: 'wrap', md: 'wrap', lg:'nowrap'}}} >
        <Box sx={{display: 'flex', width: {xs: '100%', md: '100%', lg: '75%'}, paddingRight: {xs: '0', s:'0', md: '00px', lg: '20px'}}}> 
          <img src={logo} alt="Loading...." style={{width:"-webkit-fill-available", height:"532px"}}/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:{xs: '100%', md: '100%', lg: '25%'} }}>
          <ImageList sx={{ maxWidth: '100%', height: 'auto', flexWrap: 'nowrap', marginTop:0 }} rowHeight={130} cols={isLargeScreen ? 2 : 4}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img srcSet={`${item.img}`} src={`${item.img}`} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%' }} />
              </ImageListItem>
            ))}
          </ImageList>
      </Box>
      </Box>

      <Typography sx={{ fontSize: "20px" }}>
        <strong>2015 BMW</strong>
      </Typography>
      <Box>
        <Box
          sx={{
            borderLeft: "4px solid lightgreen",
          }}
        >
          <Typography
            sx={{ ml: 2, mt: 1, fontSize: "20px", color: "lightgreen" }}
          >
            <strong>$ 5,254</strong>
          </Typography>
        </Box>
        <Typography sx={{ mt: 2 }}>
          <strong>THE VEHICLE STORY</strong>
        </Typography>
        <Typography>
          DIY Inspection in case you want to sell your car, or need to send your
          vehicle information to a friend or mechanic.
        </Typography>
      </Box>
      <Typography sx={{ paddingTop: 4 }}>
        <strong>Exterior</strong>(4)
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "30px",
          "@media (min-width: 1460px)": {
            gridTemplateColumns: "1fr 1fr",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexWrap:"wrap"
          }}
        >
       <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2rem",
  }}
>
  {exteriorImgs.map((item) => (
    <Box
      key={item.img}
      style={{
        flexBasis: "calc(25% - 10px)",
        boxSizing: "border-box",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  ))}
</Box>


<Typography sx={{mt:2}} >
  <strong>Tyre </strong>(4)
</Typography>

<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2rem",
  }}
>
  {tyreImgs.map((item) => (
    <Box
      key={item.img}
      style={{
        flexBasis: "calc(25% - 10px)",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  ))}
</Box>

          <Typography>
            <strong>Interior</strong>(3)
          </Typography>

          <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2rem",
  }}
>
  {interiorImgs.map((item) => (
    <Box
      key={item.img}
      style={{
        flexBasis: "calc(25% - 10px)",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  ))}
</Box>

 <Typography>
  <strong>Engine</strong>(1)
  </Typography>
  <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "2rem",
  }}
>
  {engineImgs.map((item) => (
    <Box
      key={item.img}
      style={{
        flexBasis: "calc(25% - 10px)",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  ))}
</Box>

        </Box>
        <Box>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              
            }}
          >
            <Typography sx={{ ml: 3, pt: 2, pl: 1 }}>
              <strong> Details</strong>
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <CalendarMonthIcon />
                <Typography>
                  <strong>Year:</strong> 2015
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <FactoryIcon />
                <Typography>
                  <strong>Make:</strong> Volkswagen
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <DirectionsCarIcon />
                <Typography>
                  <strong>Engine:</strong> 2.L4 16V TURBO DIESEL
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <ViewInArIcon />
                <Typography>
                  <strong>Model:</strong> Passat
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <SettingsIcon />
                <Typography>
                  <strong>Transmission:</strong> 6-Speed Automatic
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <TireRepairIcon />
                <Typography>
                  <strong>Mileage:</strong> 136500
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "0px", ml: 4, mr: 4 }} />
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ ml: 3, pt: 2, pl: 1 }}>
              <strong> SELLER INFO</strong>
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <PlaceIcon />
                <Typography> <strong> Location:</strong> Denver, CO </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 4 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <ThreePIcon />
                <Typography><strong>Seller Type:</strong> Private Party</Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "0px", ml: 4, mr: 5 }} />
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ ml: 3, pt: 2, pl: 1 }}>
              <strong> ESTIMATED COST</strong>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box>
                <Typography sx={{ display: "flex", gap: 1 }}>
                  <strong>Delivery Price</strong>
                  (Coming Soon)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 5 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box>
                <Typography sx={{ display: "flex", gap: 2 }}>
                  <strong>Vehicle Price</strong>
                  $9,950
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 5 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box>
                <Typography sx={{ display: "flex", gap: 1 }}>
                  <strong>Shipping</strong>
                  *Calculated on shipping
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 5 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box>
                <Typography sx={{ display: "flex", gap: 1 }}>
                  <strong>Taxes</strong>
                  *Calculated on shipping
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "1px", ml: 4, mr: 5 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                ml: 4,
              }}
            >
              <Box>
                <Typography sx={{ display: "flex", gap: 1 }}>
                  <strong>Total:</strong>
                  *Calculated on shipping
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ marginY: 2, borderWidth: "0px", ml: 4, mr: 5 }} />
            <Button
              sx={{
                backgroundColor: "lightgreen",
                color: "black",
                ml: 23,
                ":hover": {
                  backgroundColor: "lightgreen",
                },
              }}
              variant="text"
            >
              GET PRE-QUALIFIED
            </Button>
            <Divider sx={{ marginY: .5, borderWidth: "0px" }} />
            <Button
              sx={{
                backgroundColor: "lightgreen",
                color: "black",
                ml: 18,
                ":hover": {
                  backgroundColor: "lightgreen",
                },
              }}
              variant="text"
            >
              NEED INSURANCE CLICK HERE
            </Button>
            <Divider sx={{ marginY: .5, borderWidth: "0px" }} />
            <Button
              sx={{
                backgroundColor: "lightgreen",
                color: "black",
                ml: 25,
                ":hover": {
                  backgroundColor: "lightgreen",
                },
              }}
              variant="text"
              size="medium"
            >
              PUT AN OFFER IN
            </Button>
            <Divider sx={{ marginY: 2.5 , borderWidth: "0px" }} />
          </Box>

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                pt: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <strong> Loan Calculator</strong>
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", ml:1, mr:1 }}>
                <TextField
                  sx={{ width: "91%" }}
                  placeholder="Vehicle Price"
                  size="small"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", ml:1, mr:1}}>
                <TextField
                  placeholder="Down Payment"
                  size="small"
                  sx={{ width: "91%" }}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", ml:1, mr:1 }}>
                <TextField
                  sx={{ width: "91%" }}
                  size="small"
                  placeholder="Interest Rate"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Box>

              <Box sx={{ display: "flex",justifyContent: "center", ml:1, mr:1 }}>
                <TextField
                  sx={{ width: "91%" }}
                  size="small"
                  placeholder="Loan Period"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Years</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", ml:1, mr:1}}>
              <TextField
                sx={{width: "91%" }}
                placeholder="Loan Period"
                size="small"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Monthly Payment
                    </InputAdornment>
                  ),
                }}
              />
              </Box>
            </Box>
            <Divider sx={{ marginY: 2.5, borderWidth: "0px" }} />
          </Box>
        </Box>
      </Box>
  </Container>
  );
}
