import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DashboardLayout from './DashboardLayout';

const styles = {
  section: {
    padding: '40px 0',
    backgroundColor: '#f9f9f9',
  },
  card: {
    margin: '16px',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  media: {
    height: 200,
    borderRadius: '16px 16px 0 0',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    marginTop: '16px',
  },
  authorDate: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '16px',
  },
  button: {
    marginTop: '16px',
  },
};

const blogPosts = [
  {
    title: '10 Tips for a Healthy Lifestyle',
    author: 'Dr. John Doe',
    date: 'June 10, 2024',
    image: 'https://via.placeholder.com/400x200',
    excerpt: 'Living a healthy lifestyle doesn’t have to be hard. Follow these 10 tips to stay on track...',
  },
  {
    title: 'Understanding Mental Health',
    author: 'Dr. Jane Smith',
    date: 'June 8, 2024',
    image: 'https://via.placeholder.com/400x200',
    excerpt: 'Mental health is just as important as physical health. Learn more about how to take care of your mental well-being...',
  },
  {
    title: 'The Benefits of Regular Exercise',
    author: 'Dr. Mike Johnson',
    date: 'June 5, 2024',
    image: 'https://via.placeholder.com/400x200',
    excerpt: 'Exercise is crucial for a healthy lifestyle. Discover the benefits of regular physical activity...',
  },
];

const Blog = () => {
  return (
    <DashboardLayout>
    <Container maxWidth="lg">
      <Box style={styles.section}>
        <Typography variant="h3" gutterBottom align="center">
          Blog
        </Typography>
        <Typography variant="h6" paragraph align="center">
          Stay updated with the latest health tips and news from our experts.
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={styles.card}>
                <CardMedia
                  style={styles.media}
                  image={post.image}
                  title={post.title}
                />
                <CardContent>
                  <Typography variant="h5" style={styles.title}>
                    {post.title}
                  </Typography>
                  <Box style={styles.authorDate}>
                    <Box style={styles.iconText}>
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2" color="textSecondary" style={{ marginLeft: '4px' }}>
                        {post.author}
                      </Typography>
                    </Box>
                    <Box style={styles.iconText}>
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2" color="textSecondary" style={{ marginLeft: '4px' }}>
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.button}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    </DashboardLayout>
  );
};

export default Blog;
