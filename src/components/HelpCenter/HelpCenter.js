"use client";

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  InputBase, 
  IconButton,
  Button 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import HelpIcon from '@mui/icons-material/Help';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import '../../../styles/HelpCenter.css';

const HelpCenter = () => {
  const mainCategories = [
    {
      title: 'Self Hosted Chatwoot',
      description: 'How to setup and run self-hosted instance of Chatwoot',
      icon: <BuildIcon />
    },
    {
      title: 'Product Documentation',
      description: 'Features on Chatwoot, how to use Chatwoot',
      icon: <ArticleIcon />
    },
    {
      title: 'API Reference',
      description: 'Find details of all the REST API resources',
      icon: <CodeIcon />
    },
    {
      title: 'Contributing Guide',
      description: 'Learn how to set up Chatwoot on your local machine and contribute',
      icon: <HelpIcon />
    },
    {
      title: 'Handbook',
      description: 'A guide on how we run Chatwoot as an organization, how we work etc',
      icon: <ArticleIcon />
    },
    {
      title: 'Ask a question',
      description: 'Do you have questions? Reach out to Chatwoot team for assistance',
      icon: <HelpIcon />
    },
    {
      title: 'Canned Responses Library',
      description: 'A curated collection of canned responses that you can use in your customer communication.',
      icon: <ArticleIcon />,
      isNew: true
    }
  ];

  const faqs = [
    'How do I automate conversations with chatbots?',
    'Can I customise Chatwoot branding?',
    'How can I extend Chatwoot for back-office operations?',
    'How can I integrate Chatwoot with Dialogflow?',
    'How can I configure IMAP in an Email channel?'
  ];

  return (
    <Box className="help-center">
      <Box className="help-header">
        <Container maxWidth="lg">
          <Typography variant="h2">Hey 👋, Welcome to our Help Center</Typography>
          <Typography variant="h6" className="help-subtitle">
            If you have questions, are confused, or just want to understand our product better – we've got your back.
          </Typography>
          <Typography variant="body1" className="search-prompt">
            You can type in your query below.
          </Typography>
          <Paper className="search-box">
            <InputBase
              placeholder="Search for articles..."
              className="search-input"
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Typography variant="body1" className="browse-prompt">
            Or browse through the categories below.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" className="help-content">
        <Grid container spacing={4}>
          {mainCategories.map((category, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper className="category-card">
                <Box className="category-icon">
                  {category.icon}
                </Box>
                <Box className="category-header">
                  <Typography variant="h5" className="category-title">
                    {category.title}
                    {category.isNew && <span className="new-badge">New</span>}
                  </Typography>
                </Box>
                <Typography variant="body1" className="category-description">
                  {category.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box className="faq-section">
          <Typography variant="h4" className="faq-title">
            Frequently asked questions
          </Typography>
          <Box className="faq-list">
            {faqs.map((faq, index) => (
              <Typography key={index} variant="body1" className="faq-item">
                {faq}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HelpCenter;