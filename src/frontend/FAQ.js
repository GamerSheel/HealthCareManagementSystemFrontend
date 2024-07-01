import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';

const faqs = [
    {
        question: 'What services do you offer?',
        answer: 'We offer a wide range of healthcare services including general check-ups, specialized treatments, emergency care, and more.',
    },
    {
        question: 'How can I book an appointment?',
        answer: 'You can book an appointment online through our website or by calling our front desk at (123) 456-7890.',
    },
    {
        question: 'What insurance plans do you accept?',
        answer: 'We accept most major insurance plans. Please contact our billing department for more details.',
    },
    {
        question: 'What are your operating hours?',
        answer: 'Our facility is open from 8 AM to 8 PM from Monday to Saturday. We are closed on Sundays.',
    },
    {
        question: 'Do you offer telehealth services?',
        answer: 'Yes, we offer telehealth services for consultations and follow-ups. Please schedule an appointment online.',
    },
    // Add more FAQs as needed
];

const FAQs = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box textAlign="center" marginBottom="2rem">
                <Typography variant="h3" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                <Typography variant="h6" color="textSecondary" paragraph>
                    Find answers to the most common questions about our services and policies.
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search FAQs"
                    fullWidth
                    onChange={handleSearchChange}
                    style={{ marginTop: '1rem' }}
                />
            </Box>
            <Grid container spacing={2}>
                {filteredFaqs.map((faq, index) => (
                    <Grid item xs={12} key={index}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography variant="h6">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </DashboardLayout>
    );
};

export default FAQs;
