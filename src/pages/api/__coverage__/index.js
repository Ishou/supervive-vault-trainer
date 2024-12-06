export default async function handler(req, res) {
  const coverageData = global.__coverage__;

  res.status(200).json({ coverage: coverageData });
}
