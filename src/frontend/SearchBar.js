import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch , boolSearchTerm }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleChange = (event) => {
    onSearch(event.target.value);
    boolSearchTerm(false);
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
      // onChange={e => onSearch(e.target.value)}
      onChange={handleChange}
        variant="outlined"
        placeholder="Search..."
        // value={searchQuery}
        // onChange={handleInputChange}
        sx={{ width: '100%', maxWidth: 700 ,borderRadius: '50px'
        , padding: '0 8px'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;



// import React, { useState } from 'react';
// import { Box, InputBase, IconButton, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     console.log('Search term:', searchTerm);
//     // Implement your search logic here
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//       <Paper
//         component="form"
//         onSubmit={handleSearchSubmit}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           width: '100%',
//           maxWidth: '600px',
//           backgroundColor: '#f5f5f5',
//           borderRadius: '50px',
//           padding: '0 8px',
//         }}
//       >
//         <InputBase
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search…"
//           inputProps={{ 'aria-label': 'search' }}
//         />
//         <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// };

// export default SearchBar;
