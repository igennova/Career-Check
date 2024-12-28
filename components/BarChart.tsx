import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/analysis_card"

// Define a type for the data structure you are passing to BarChart
interface DataPoint {
  [key: string]: number | string;  // Allow any key to be a string, number or date
}

interface BarChartProps {
  data: DataPoint[];  // Use the specific type instead of `any[]`
  xKey: string;
  yKey: string | string[];  // Allows for both a single key or multiple keys
  title: string;
  description: string;
  isMultiYear?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function BarChartComponent({
  data,
  xKey,
  yKey,
  title,
  description,
  isMultiYear = false,
}: BarChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey={xKey}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            {isMultiYear && <Legend />}
            {isMultiYear ? (
              (yKey as string[]).map((key, index) => (
                <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
              ))
            ) : (
              <Bar dataKey={yKey as string} fill="#adfa1d" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
