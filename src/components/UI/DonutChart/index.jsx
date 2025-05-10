import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "55%",
  plugins: {
    tooltip: { enabled: true },
    legend: { display: false },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const Index = ({ statistics }) => {
  const data = {
    labels: ["Active Users", "InActive Users"],
    datasets: [
      {
        data: [statistics?.activePercentage, statistics?.inactivePercentage],
        backgroundColor: ["#BFC6F0", "#ECCED8"],
        borderWidth: 0,
      },
    ],
  };

  const legendItems = [
    {
      label: "Active Users",
      color: "#BFC6F0",
      value: statistics?.activePercentage,
    },
    {
      label: "InActive Users",
      color: "#ECCED8",
      value: statistics?.inactivePercentage,
    },
  ];

  return (
    <Box
      className="bg-light  rounded-4 shadow-sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        py: 1,
        ps: 0,
        borderRadius: 3,
      }}
    >
      <Box sx={{ width: 120, height: 180 }}>
        <Doughnut data={data} options={options} />
      </Box>

      <Box>
        {legendItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 14,
              mb: 0.5,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  borderRadius: "50%",
                }}
              />
              {item.label}
            </Box>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
