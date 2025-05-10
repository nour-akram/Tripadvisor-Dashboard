import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./style.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const legendItems = [
  { label: "Hotels", color: "#E5D9A8" },
  { label: "Restaurants", color: "#BFC6F0" },
  { label: "Attractives", color: "#ECCED8" },
  { label: "Flights", color: "#C8E2E2" },
];

const chartData = {
  labels: legendItems.map((item) => item.label),
  datasets: [
    {
      label: "Bookings",
      data: [80, 60, 65, 95],
      backgroundColor: legendItems.map((item) => item.color),
      borderRadius: 8,
      barThickness: 30,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      grid: { color: "#f0f0f0" },
      ticks: { stepSize: 20 },
    },
  },
};

const MonthlyBookingChart = () => {
  return (
    <Card className="shadow-sm rounded-4 p-2">
      <CardContent>
        <Typography variant="h6" gutterBottom className="fw-semibold fs-6 mb-3">
          Booking Statistics
        </Typography>
        <Box className="row  align-items-start">
          <Box className="col-md-4 d-flex flex-column gap-2 mb-3">
            {legendItems.map((item) => (
              <Box key={item.label} className="d-flex align-items-center gap-2">
                <span
                  style={{
                    background: item.color,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                  }}
                />
                <p className="m-0 label">{item.label}</p>
              </Box>
            ))}
          </Box>

          <Box className="col-md-8" style={{ height: 150 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyBookingChart;
