import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/front.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import BreadCrumbs from "../../components/BreadCrumbs";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
} from "@mui/material";

export default function SaleDetails() {

  const [state, setState] = useState("");

  const [damageAwareness, setDamageAwareness] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2023-08-1T12:00")
  );
  const [testDriveLocation, setTestDriveLocation] = useState("");

  return (
    <Container>
      <BreadCrumbs title="My Garage" optionalProp="Add Vehicle" />
      <Box
        sx={{ mt: 5, display: "flex", gap: "30px", alignItems: "start", mb: 3 }}
      >
        <img
          src={logo}
          alt="Loading...."
          style={{ height: "350px", width: "450px" }}
        />

        <Box>
          <Typography sx={{ fontSize: "30px" }}>
            <strong>2020 BMW</strong>
          </Typography>
          <Box
    sx={{
      mt: 10,
      gap: "8px",
      display: "flex",
      flexDirection: "row", // Stack buttons vertically on small screens
    }}
  >
    <Button
      disabled
      size="small"
      sx={{
        color: "grey",
        backgroundColor: "lightgrey",
        width: "100%",
        marginBottom: "25px",
      }}
    >
      View Listing
    </Button>
    <Button
      size="small"
      disabled
      sx={{
        color: "grey",
        backgroundColor: "lightgrey",
        width: "100%",
        marginBottom: "25px",
      }}
    >
      Vehicle History
    </Button>
    <Button
      disabled
      size="small"
      sx={{
        color: "grey",
        backgroundColor: "lightgrey",
        width: "100%",
        marginBottom: "25px",
      }}
    >
      Window Brochure
    </Button>
    <Button
      disabled
      size="small"
      sx={{
        color: "grey",
        backgroundColor: "lightgrey",
        width: "100%",
        marginBottom: "25px",

      }}
    >
      
      More<ExpandMoreIcon />
    </Button>
  </Box>
        </Box>
      </Box>

      <Box>
        <Accordion
          sx={{
            marginTop: "30px",
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              1
            </Box>

            <Typography sx={{ ml: 2, mt: 2 }}>
              <strong> Vehicle Details</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1 }}>License Plate</Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  placeholder="License Plate"
                ></TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>Trim</Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">CREW CAB 5.3L LTZ</MenuItem>
                  <MenuItem value="option2">Other</MenuItem>
                </TextField>
              </Box>
            </Box>
            <Box sx={{ ml: 2, mt: 2 }}>
              <Typography sx={{ mb: 1 }}>Miles</Typography>
              <Box sx={{ display: "flex" }}>
                <TextField sx={{ width: "24%" }}></TextField>
              </Box>
            </Box>
            <Box sx={{ ml: 2, mt: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Zip Code <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField sx={{ width: "24%" }} required />
              </Box>
            </Box>

            <Box sx={{ ml: 2, mt: 2 }}>
              <Typography sx={{ mb: 1 }}>Asking Price</Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  placeholder="00"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Box>
            </Box>

            <Typography sx={{ ml: 2, mt: 3, color: "skyblue" }}>
              <strong>Average Retail: $24,000.00</strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              2
            </Box>
            <Typography sx={{ ml: 2, mt: 2 }}>
              <strong> Photos </strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container
              sx={{
                border: "2px dashed black",
                backgroundColor: "lightgray",
                height: 160,
              }}
            >
              <Typography sx={{ fontSize: 18, mt: 2 }}>
                Upload at least 5 photos
              </Typography>
              <Typography>
                Cars with high quality photos are sold five-times faster than
                those without.
              </Typography>
              <form>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                    />
                    <Button
                      sx={{ mt: 3 }}
                      size="large"
                      variant="outlined"
                      color="primary"
                      component="span"
                    >
                      Add Photo
                    </Button>
                  </label>
                </Box>
              </form>
            </Container>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              3
            </Box>

            <Typography sx={{ ml: 2, mt: 2 }}>
              {" "}
              <strong> Additional Details </strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Vehicle Descriotion
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <textarea
                  style={{
                    width: "24%",
                    height: "100px",
                    boxSizing: "border-box",
                    border: "2px solid lightgray",
                  }}
                ></textarea>
              </Box>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Drive type
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">4WD</MenuItem>
                  <MenuItem value="option2">2-Wheel Drive</MenuItem>
                  <MenuItem value="option3">4-Wheel Drive</MenuItem>
                  <MenuItem value="option4">AWD</MenuItem>
                  <MenuItem value="option5">FWD</MenuItem>
                  <MenuItem value="option6">RWD</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Number of cylinders
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">3 cylinder</MenuItem>
                  <MenuItem value="option2">4 cylinder</MenuItem>
                  <MenuItem value="option3">5 cylinder</MenuItem>
                  <MenuItem value="option4">6 cylinder</MenuItem>
                  <MenuItem value="option5">8 cylinder</MenuItem>
                  <MenuItem value="option6">12 cylinder</MenuItem>
                  <MenuItem value="option6">Other</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Engine
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField sx={{ width: "24%" }}></TextField>
              </Box>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Fuel Type
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">Gas</MenuItem>
                  <MenuItem value="option2">Diesel</MenuItem>
                  <MenuItem value="option3">Electric</MenuItem>
                  <MenuItem value="option4">Hybrid</MenuItem>
                  <MenuItem value="option5">Biodiesel Flex Fuel</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Number Of Doors
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">2 Doors</MenuItem>
                  <MenuItem value="option2">3 Doors</MenuItem>
                  <MenuItem value="option3">4 Doors</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Exterior color
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {/* List of options */}
                  <MenuItem value="option1">Black</MenuItem>
                  <MenuItem value="option2">Blue</MenuItem>
                  <MenuItem value="option3">White</MenuItem>
                  <MenuItem value="option4">Pink</MenuItem>
                  <MenuItem value="option5">Purple</MenuItem>
                  <MenuItem value="option6">White</MenuItem>
                  <MenuItem value="option7">Gray</MenuItem>
                  <MenuItem value="option8">Silver</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Interior color
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {/* List of options */}
                  <MenuItem value="option1">Black</MenuItem>
                  <MenuItem value="option2">Blue</MenuItem>
                  <MenuItem value="option3">White</MenuItem>
                  <MenuItem value="option4">Pink</MenuItem>
                  <MenuItem value="option5">Purple</MenuItem>
                  <MenuItem value="option6">White</MenuItem>
                  <MenuItem value="option7">Gray</MenuItem>
                  <MenuItem value="option8">Silver</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ ml: 2 }}>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Title Type
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  sx={{ width: "24%" }}
                  select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="option1">Clear</MenuItem>
                  <MenuItem value="option2">Salvage</MenuItem>
                  <MenuItem value="option3">Branded</MenuItem>
                  <MenuItem value="option4">Rebuilt/Reconstructed</MenuItem>
                  <MenuItem value="option5">Dismantled</MenuItem>
                </TextField>
              </Box>
            </Box>
            <Typography sx={{ ml: 2, mt: 2 }}>
              Are you aware of any damage or defects that would materially
              affect the value of the vehicle?{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>

            <FormControl component="fieldset" sx={{ ml: 2 }}>
              <RadioGroup
                aria-label="damage-awareness"
                name="damage-awareness"
                value={damageAwareness}
                onChange={(e) => setDamageAwareness(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {damageAwareness === "yes" && (
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ mt: 2 }}>
                  Please describe the damage or defects:
                </Typography>
                <TextareaAutosize
                  style={{ width: 490, height: 150, borderColor: "lightgray" }}
                  aria-label="damage-description"
                />
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        <Typography sx={{ mt: 3, mb: 3 }}>Optional</Typography>
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              4
            </Box>

            <Typography sx={{ ml: 2, mt: 2 }}>
              {" "}
              <strong> Test Drive </strong>{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: 1 }}>
              <strong>General availability</strong>
            </Typography>
            <Typography sx={{ ml: 1, mb: 1 }}>
              You can select the best days/times that work for your potential
              buyers to choose from.
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ ml: 1 }}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </Box>
            </LocalizationProvider>
            <Typography sx={{ ml: 1, mt: 1 }}>Location</Typography>
            <Typography sx={{ ml: 1 }}>
              Set a preferred location for test drives. Potential buyers can set
              their own location too.
            </Typography>
            <Typography sx={{ ml: 1, mt: 3 }}>
              <strong>Location</strong>
            </Typography>
            <TextField
              sx={{ width: "24%", ml: 1 }}              
              placeholder="Enter Location"
            ></TextField>
            <Typography sx={{ color: "gray", mt: 2, ml: 1 }}>
              Shopping malls, grocery stores, and police stations are great
              places to test drive a car.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              5
            </Box>
            <Typography sx={{ ml: 2, mt: 2 }}>
              {" "}
              <strong> Ownership info </strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ ml: 2 }}>
              <Typography>Do you have the vehicle title on hand?</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="test-drive-locations"
                  name="test-drive-locations"
                  value={testDriveLocation}
                  onChange={(e) => setTestDriveLocation(e.target.value)}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <Typography>
                Does the vehicle have a lien from bank or other institution?
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="damage-awareness"
                  name="damage-awareness"
                  value={damageAwareness}
                  onChange={(e) => setDamageAwareness(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {damageAwareness === "yes" && (
                <Box>
                  <Typography sx={{ mb: 1, mt: 2 }}>Bank name</Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>

                  <Typography sx={{ mb: 1, mt: 2 }}>Phone number</Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>

                  <Typography sx={{ mb: 1, mt: 2 }}>
                    Loan account number
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>

                  <Typography sx={{ fontSize: 20, mb: 1, mt: 2 }}>
                    Estimated loan amount
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      sx={{ width: "24%" }}
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </Box>
                </Box>
              )}

              <Typography sx={{ mt: 3 }}>
                <strong>Co-seller</strong>
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {state === "yes" && (
                <Box>
                  <Typography sx={{ mb: 1, mt: 2 }}>First name</Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>

                  <Typography sx={{ mb: 1, mt: 2 }}>Last name</Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>

                  <Typography sx={{ mb: 1, mt: 2 }}>Phone number</Typography>
                  <Box sx={{ display: "flex" }}>
                    <TextField sx={{ width: "24%" }}></TextField>
                  </Box>
                </Box>
              )}
              <Box sx={{ mt: 3 }}>
                <Typography>
                  <strong>Documents</strong>
                </Typography>
                <Typography>
                  Upload documents like your title, warranty info, proof of
                  upgrades or mods. Documents will remain private until shared
                  with specific buyer.
                </Typography>
              </Box>
              <Box sx={{ border: "2px solid gray" }}>
                <Box
                  sx={{
                    border: "2px dashed lightgray",
                    mt: 2,
                    ml: 2,
                    width: 130,
                    height: 130,
                  }}
                >
                  <DescriptionIcon
                    sx={{ color: "gray", fontSize: 50, ml: 4.5, mt: 4 }}
                  />
                </Box>
                <Typography sx={{ fontSize: "25px", ml: 2, mt: 1 }}>
                  Vehicle title
                </Typography>
                <form>
                  <Box>
                    <label>
                      <input
                        type="file"
                        accept="document"
                        multiple
                        style={{ display: "none" }}
                      />
                      <Button
                        sx={{ mt: 1, ml: 2, mb: 2 }}
                        size="large"
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Attach The File
                      </Button>
                    </label>
                  </Box>
                </form>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            "&.MuiPaper-root": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                padding: "12px",
                textAlign: "center",
                border: "2px solid #eee",
                borderRadius: "100%",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              6
            </Box>

            <Typography sx={{ ml: 2, mt: 2 }}>
              {" "}
              <strong> Deal preferences </strong>{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ ml: 3, mb: 2 }}>
              <strong>Verified status for buyers</strong>
            </Typography>
            <FormControlLabel
              sx={{ ml: 4 }}
              control={<Checkbox />}
              label={<Typography>Full Verification (Recommended)</Typography>}
            />
            <Typography sx={{ ml: 9, color: "gray" }}>
              Buyers must verify their phone, email, and driver's license to
              send you a message, make offers or schedule a test drive.
            </Typography>

            <FormControlLabel
              sx={{ ml: 4, mt: 2 }}
              control={<Checkbox />}
              label={
                <Typography>Verified Funds</Typography>
              }
            />
            <Typography sx={{ ml: 9, color: "gray" }}>
              Buyer must have at least 80% of funds available in their
              PrivateAuto Pay account to make an offer or schedule a test drive.
            </Typography>

            <Typography sx={{ ml: 3, mb: 2 }}>
              <strong>Payment methods</strong>
            </Typography>
            <FormControlLabel
              sx={{ ml: 4 }}
              control={<Checkbox />}
              label={<Typography>PrivateAuto Pay (Recommended)</Typography>}
            />
            <Typography sx={{ ml: 9, color: "gray" }}>
              Secure electronic payment.
            </Typography>

            <FormControlLabel
              sx={{ ml: 4, mt: 2 }}
              control={<Checkbox />}
              label={<Typography>Cash</Typography>}
            />
            <Typography sx={{ ml: 9, color: "gray" }}>
              Allow partial or full cash payment.
            </Typography>

            <FormControlLabel
              sx={{ ml: 4, mt: 2 }}
              control={<Checkbox />}
              label={<Typography>Bitcoin/Crypto</Typography>}
            />
            <Typography sx={{ ml: 9, color: "gray" }}>
              Seller and buyer will transfer funds using their own crypto
              wallets.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
