import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    name: `ETH Ecole Ticket #${req.query.id}`,
    description: "Ticket for ETH Ecole on July 21.",
    image: "https://eth-ecole-nft-site.vercel.app/nft.svg",
  })
}
