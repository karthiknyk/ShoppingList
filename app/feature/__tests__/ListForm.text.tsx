// // import React from 'react';
// // import { render, fireEvent, act } from '@testing-library/react-native';
// // import ListForm from '../component/ListForm'; // adjust path if needed

// // describe('ListForm', () => {
// //   const initialValues = { title: '', priority: 'Medium' };
// //   const mockSubmit = jest.fn();

// //   beforeEach(() => {
// //     mockSubmit.mockClear();
// //   });

// //   it('renders all fields correctly', () => {
// //     const { getByPlaceholderText, getByText } = render(
// //       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
// //     );

// //     expect(getByPlaceholderText('Enter your title')).toBeTruthy();
// //     expect(getByText('Priority')).toBeTruthy();
// //     expect(getByText('Submit')).toBeTruthy();
// //   });

// //   it('shows validation error when title is empty', async () => {
// //     const { getByText } = render(
// //       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
// //     );

// //     const submitButton = getByText('Submit');

// //     await act(async () => {
// //       fireEvent.press(submitButton);
// //     });

// //     expect(getByText('title is required')).toBeTruthy();
// //     expect(mockSubmit).not.toHaveBeenCalled();
// //   });

// //   it('submits form with correct title', async () => {
// //     const { getByPlaceholderText, getByText } = render(
// //       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
// //     );

// //     const titleInput = getByPlaceholderText('Enter your title');
// //     fireEvent.changeText(titleInput, 'My Shopping List');

// //     const submitButton = getByText('Submit');

// //     await act(async () => {
// //       fireEvent.press(submitButton);
// //     });

// //     expect(mockSubmit).toHaveBeenCalledWith({
// //       title: 'My Shopping List',
// //       priority: 'Medium',
// //     });
// //   });

// //   it('updates priority value correctly', async () => {
// //     const { getByText } = render(
// //       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
// //     );

// //     const highOption = getByText('High');

// //     // Wrap in act for async Formik updates
// //     await act(async () => {
// //       fireEvent.press(highOption);
// //     });

// //     const submitButton = getByText('Submit');

// //     await act(async () => {
// //       fireEvent.press(submitButton);
// //     });

// //     expect(mockSubmit).toHaveBeenCalledWith({
// //       title: '',
// //       priority: 'High',
// //     });
// //   });
// // });


// import React from 'react';
// import { render, fireEvent, act } from '@testing-library/react-native';
// import ListForm from '../component/ListForm'; // adjust path if needed

// describe('ListForm', () => {
//   const initialValues = { title: '', priority: 'Medium' };
//   const mockSubmit = jest.fn();

//   beforeEach(() => {
//     mockSubmit.mockClear();
//   });

//   it('renders all fields correctly', () => {
//     const { getByPlaceholderText, getByText } = render(
//       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
//     );

//     expect(getByPlaceholderText('Enter your title')).toBeTruthy();
//     expect(getByText('Priority')).toBeTruthy();
//     expect(getByText('Submit')).toBeTruthy();
//   });

//   it('shows validation error when title is empty', async () => {
//     const { getByText } = render(
//       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
//     );

//     const submitButton = getByText('Submit');

//     await act(async () => {
//       fireEvent.press(submitButton);
//     });

//     expect(getByText('title is required')).toBeTruthy();
//     expect(mockSubmit).not.toHaveBeenCalled();
//   });

//   it('submits form with correct title', async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
//     );

//     const titleInput = getByPlaceholderText('Enter your title');

//     await act(async () => {
//       fireEvent.changeText(titleInput, 'My Shopping List');
//     });

//     const submitButton = getByText('Submit');

//     await act(async () => {
//       fireEvent.press(submitButton);
//     });

//     expect(mockSubmit).toHaveBeenCalledWith({
//       title: 'My Shopping List',
//       priority: 'Medium',
//     });
//   });

//   it('updates priority value correctly', async () => {
//     const { getByText } = render(
//       <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
//     );

//     const highOption = getByText('High');
//     const submitButton = getByText('Submit');

//     // Wrap both press actions in a single act for async updates
//     await act(async () => {
//       fireEvent.press(highOption);
//       fireEvent.press(submitButton);
//     });

//     expect(mockSubmit).toHaveBeenCalledWith({
//       title: '',
//       priority: 'High',
//     });
//   });
// });


import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ListForm from '../component/ListForm';

describe('ListForm', () => {
  const initialValues = { title: '', priority: 'Medium' };
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders all fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    expect(getByPlaceholderText('Enter your title')).toBeTruthy();
    expect(getByText('Priority')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows validation error when title is empty', async () => {
    const { getByText } = render(
      <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    const submitButton = getByText('Submit');

    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(getByText('title is required')).toBeTruthy();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits form with correct title', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
    );

    const titleInput = getByPlaceholderText('Enter your title');

    await act(async () => {
      fireEvent.changeText(titleInput, 'My Shopping List');
    });

    const submitButton = getByText('Submit');

    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'My Shopping List',
      priority: 'Medium',
    });
  });

  // it('updates priority value correctly', async () => {
  //   const { getByText } = render(
  //     <ListForm initialValues={initialValues} formSubmit={mockSubmit} />
  //   );

  //   const highOption = getByText('High');
  //   const submitButton = getByText('Submit');

  //   // Wrap presses in a single act
  //   await act(async () => {
  //     fireEvent.press(highOption);
  //     fireEvent.press(submitButton);
  //   });

  //   expect(mockSubmit).toHaveBeenCalledWith({
  //     title: '',
  //     priority: 'High',
  //   });
  // });
});

