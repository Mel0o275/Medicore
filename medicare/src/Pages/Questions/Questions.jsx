import React from "react";
import { questionFaq } from "../../Constants/NavPages";
import { Box, Divider, Grid, Typography, Container } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import useTheme from "../../Store/useTheme";

const steps = Object.keys(questionFaq);

export default function Questions() {
  const [expanded, setExpanded] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const sectionRefs = React.useRef([]);
  const scrollContainerRef = React.useRef(null);
  const isScrolling = React.useRef(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Handle stepper click to scroll to section
  const handleStepClick = (index) => {
    if (sectionRefs.current[index] && scrollContainerRef.current) {
      isScrolling.current = true;
      setActiveStep(index);

      const sectionTop = sectionRefs.current[index].offsetTop;
      scrollContainerRef.current.scrollTo({
        top: sectionTop - 20, // Add some offset
        behavior: "smooth",
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveStep(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const theme = useTheme();

  return (
    <Container sx={{ p: 2, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Left: Static Stepper */}
        <Grid size={{ md: 4, xs: 12 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: "bold",
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Box
            sx={{
              position: "sticky",
              top: 20,

              zIndex: 10,
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                "& .MuiStepLabel-root": {
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                    transform: "translateX(4px)",
                  },
                },
                "& .MuiStepLabel-label": {
                  fontSize: "1rem",
                  fontWeight: 600,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
                "& .MuiStepIcon-root": {
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                  "&.Mui-active": {
                    color:
                      theme.mode !== "dark"
                        ? theme.primaryText
                        : theme.primaryColor,
                  },
                  "&.Mui-completed": {
                    color:
                      theme.mode !== "dark"
                        ? theme.primaryText
                        : theme.primaryColor,
                  },
                },
                "& .MuiStepLabel-label.Mui-active": {
                  fontWeight: "bold",
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      color:
                        theme.mode !== "dark"
                          ? theme.primaryText
                          : theme.primaryColor,
                    }}
                    onClick={() => handleStepClick(index)}
                    StepIconComponent={"none"}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>

        {/* Right: Scrollable Questions */}
        <Grid size={{ md: 8, xs: 12 }}>
          <Box
            ref={scrollContainerRef}
            sx={{
              height: "80vh",
              overflowY: "auto",
              p: 3,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: 8,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor:
                  theme.mode !== "dark"
                    ? theme.primaryColor
                    : theme.secondaryText,
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor:
                  theme.mode !== "dark"
                    ? theme.primaryColor
                    : theme.secondaryText,
                borderRadius: 4,
                "&:hover": {
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                },
              },
            }}
          >
            {Object.values(questionFaq).map((arr, i) => (
              <Box
                key={i}
                data-index={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                sx={{
                  scrollMarginTop: "120px",
                  mb: 4,
                  transition: "all 0.3s ease",
                  transform:
                    activeStep === i ? "translateX(8px)" : "translateX(0)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    mt: i === 0 ? 0 : 4,
                    color:
                      theme.mode !== "dark"
                        ? theme.primaryText
                        : theme.primaryColor,

                    padding: "12px 16px",
                    backgroundColor:
                      activeStep === i
                        ? theme.mode !== "dark"
                          ? theme.primaryColor
                          : theme.secondaryText
                        : "transparent",
                    borderRadius: 2,
                    borderLeft:
                      activeStep === i ? "4px solid " : "4px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  {steps[i]}
                </Typography>

                {arr.map((item, j) => {
                  const panelId = `${i}-${j}`;
                  return (
                    <Accordion
                      key={panelId}
                      expanded={expanded === panelId}
                      onChange={handleExpansion(panelId)}
                      slots={{ transition: Fade }}
                      slotProps={{ transition: { timeout: 400 } }}
                      sx={[
                        {  backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                          mb: 1,
                          borderRadius: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                          "&:before": { display: "none" },
                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            transform: "translateY(-2px)",
                          },
                        },
                        expanded === panelId
                          ? {
                              [`& .${accordionClasses.region}`]: {
                                height: "auto",
                              },
                              [`& .${accordionDetailsClasses.root}`]: {
                                display: "block",
                              },
                              backgroundColor:
                                theme.mode !== "dark"
                                  ? theme.primaryColor
                                  : theme.secondaryText,
                              border: "1px solid rgba(25, 118, 210, 0.2)",
                            }
                          : {
                              [`& .${accordionClasses.region}`]: { height: 0 },
                              [`& .${accordionDetailsClasses.root}`]: {
                                display: "none",
                              },
                            },
                      ]}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            transition: "transform 0.3s ease",
                          },
                          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                            {
                              transform: "rotate(180deg)",
                            },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color:
                              theme.mode !== "dark"
                                ? theme.primaryText
                                : theme.primaryColor,
                          }}
                        >
                          {item[0]}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          sx={{
                            lineHeight: 1.6,
                            color:
                              theme.mode !== "dark"
                                ? theme.primaryText
                                : theme.primaryColor,
                          }}
                        >
                          {item[1]}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
                {i < Object.values(questionFaq).length - 1 && (
                  <Divider
                    sx={{
                      my: 3,
                      borderColor: "grey.300",
                      opacity: activeStep === i ? 1 : 0.5,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
