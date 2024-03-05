import '@testing-library/jest-dom'
import React from 'react'
import axios from 'axios'

const mockBaseURL = 'http://localhost:3000/api/v1'
const mockApi = axios.create({ baseURL: mockBaseURL })

jest.mock('./src/apis/configs/axiosConfig.js', () => ({
  api: mockApi,
}))

global.React = React
