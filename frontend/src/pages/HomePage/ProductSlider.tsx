  import React from 'react'
  import { Box, Button,Typography, Paper, Container } from "@mui/material";
  import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
  import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

  const cards = [
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Love-2.png?fit=1080%2C1080&ssl=1',
        text: 'LOVE',
        description:' Love is the heart of LYFERS, the bedrock of its six guiding principles. Its like the soil that lets the others grow. The love we talk about here is boundless, selfless, and heavenly. Its the kind that never tires of giving and sacrificing for others. Love is fresh like youth, forgiving like a gentle breeze, empowering like a guiding light, resilient like a sturdy tree, and strong like a mountain.'
      },
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Empower.webp?w=1080&ssl=1',
        text: 'EMPOWER',
        description:'Empowering others is essential to empowering oneself. It gives a sense of purpose and belonging and showcases that our existence, in fact, matters. The positive energy empowerment exudes becomes our essential fuel to feed off when times are difficult, and gives us the added boost necessary to push through the same.'
      },
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Youthful-1-1.png?fit=1080%2C1080&ssl=1',
        text: 'YOUTHFULLNESS',
        description:'Youthfulness is the catalyst for a happy soul. It is the key organic ingredient within that translates to a long-lasting and healthy life. Youthfulness also allows us to keep our sense of playfulness and humor, which socially attract others. It keeps us active and alive, and therefore could be considered the gateway to the mysterious, yet resourceful, Fountain of Youth!'
      },
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Forgiving-1-1.png?fit=1080%2C1080&ssl=1',
        text: 'FORGIVENESS',
        description:'Forgiveness is essential to relieving our hearts and minds of heavy burdens and tragedies that have occurred throughout our lives. It frees us from negative thoughts and emotions that adversely impact our health, both spiritually and mentally. Forgiveness teaches us that we are not perfect and that mistakes, no matter their severity, are bound to be made. Finally, forgiveness has been the ultimate declaration of humility and love throughout the history of mankind.'
      },
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/06/R.png?fit=1080%2C1080&ssl=1',
        text: 'RESILENCE',
        description:'Resilience is the unwavering spirit to rise above adversity, the strength to overcome obstacles, and the courage to keep moving forward despite setbacks. Its about embracing challenges, learning from failures, and transforming struggles into growth opportunities. Each time you bounce back, you become stronger, wiser, and more determined. Remember, resilience is not about avoiding difficulties but facing them head-on with a positive attitude. Keep pushing forward, for every challenge conquered is a step closer to your goals and dreams. Stay resilient, and let your perseverance shine.'
      },
      {
        imageUrl: 'https://i0.wp.com/lyfers.com/wp-content/uploads/2024/05/Strength.webp?w=1080&ssl=1',
        text: 'STRENGTH',
        description:'Strength for the purpose of LYFERS is a testament to inner willpower that is achieved through perseverance. It gives us the power to overcome life’s challenges from within. Mental fortitude is exactly what many of us could appreciate with today’s current events. Luckily for us, there is a substantial amount of boldness and power we can obtain when we choose to become a LYFER - Loving, Youthful, Forgiving, Empowering, and Resilient!'
      },
    ];

  export default function ProductSlider() {

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const cardsToShow = { xs: 1, sm: 1, md: 3 }; // Show one card at a time on small screens
    const totalCards = cards.length;
    const maxIndex = Math.ceil(totalCards / cardsToShow.md) - 1;

    const handleNext = () => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    };

    const handleBack = () => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    return (
      <Container>
        <Box component="section" sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${(currentIndex * 100) / cardsToShow.md}%)`,
              width: `${totalCards * (100 / cardsToShow.md)}%`,
              height: { xs: 200, sm: 250, md: 300 },
            }}
          >
            {cards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  width: `${100 / cardsToShow.md}%`,
                  p: 1,
                  boxSizing: 'border-box',
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    overflow: 'hidden',
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Box
                    component="img"
                    src={card.imageUrl}
                    alt={`Card ${index + 1}`}
                    sx={{
                      width: { xs: 150, sm: 200, md: 300 },
                      height: { xs: 150, sm: 200, md: 300 },
                      mb: 1,
                    }}
                  />
                </Paper>
              </Box>
            ))}
          </Box>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex', 
              justifyContent: 'space-between', 
              width: '100%', 
              px: 2, 
              // Adjusting button positioning
            }}
          >
            <Button 
              onClick={handleBack} 
              disabled={currentIndex === 0}
              sx={{ 
                position: 'absolute', 
                left: 0, 
                // Add some padding to align with the edges
              }}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={currentIndex >= maxIndex}
              sx={{ 
                position: 'absolute', 
                right: 0,
                // Add some padding to align with the edges
              }}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          </Box>
        </Box>
      </Container>
    )
  }
