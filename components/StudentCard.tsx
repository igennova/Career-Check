import Image from 'next/image'

interface StudentCardProps {
  name: string
  year: number
  branch: string
  image: string
}

export default function StudentCard({ name, year, branch, image }: StudentCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden min-h-[220px] flex flex-col">
      {/* Aspect ratio for the image */}
      <div className="h-28 flex items-center justify-center relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      {/* Content area */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div>
          <p className="text-sm text-gray-600">Year: {year}</p>
          <p className="text-sm text-gray-600">Branch: {branch}</p>
        </div>
      </div>
    </div>
  );
}