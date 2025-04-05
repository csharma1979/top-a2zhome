import React from "react";
import { testimonials } from "../../Data/HomePageData";
import { Box, Container, Typography, Avatar ,Card ,CardContent ,Rating} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="comp-space comp-color">
      {/* <Box sx={{ backgroundColor: "#f5f5f5", py: 8 }}> */}
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" mb={6}>
            What Our Clients Say
          </Typography>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    p: 3,
                    mx: 1,
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      color: "#2196f3",
                      opacity: 0.3,
                      fontSize: 40,
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontStyle: "italic", mb: 3 }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={testimonial.image}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.location}
                        </Typography>
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>
      {/* </Box> */}
    </div>
  );
};

export default Testimonials;
