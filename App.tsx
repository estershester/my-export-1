import React, { useState, useRef, useEffect } from 'react';

interface PlantInfo {
  name: string;
  suitableForIndoor: boolean;
  benefits: string[];
  advisory: string[];
}

const mockPlantData: { [key: string]: PlantInfo } = {
  'Monstera Deliciosa': {
    name: 'Monstera Deliciosa',
    suitableForIndoor: true,
    benefits: ['Air purification', 'Aesthetic appeal', 'Easy to care for'],
    advisory: ['Water when soil is dry', 'Prefers indirect sunlight', 'Wipe leaves occasionally'],
  },
  'Peace Lily': {
    name: 'Peace Lily',
    suitableForIndoor: true,
    benefits: ['Air purification', 'Low maintenance', 'Elegant look'],
    advisory: ['Keep soil moist', 'Prefers shade', 'Toxic to pets'],
  },
  'Fiddle Leaf Fig': {
      name: 'Fiddle Leaf Fig',
      suitableForIndoor: true,
      benefits: ['Aesthetic appeal', 'Large dramatic leaves', 'Can improve mood'],
      advisory: ['Requires bright indirect light', 'Water when top inch of soil is dry', 'Sensitive to overwatering'],
  },
  'Snake Plant': {
      name: 'Snake Plant',
      suitableForIndoor: true,
      benefits: ['Air purification', 'Extremely low maintenance', 'Tolerates low light'],
      advisory: ['Water sparingly', 'Allow soil to dry completely between waterings', 'Avoid cold temperatures'],
  },
    'Spider Plant': {
        name: 'Spider Plant',
        suitableForIndoor: true,
        benefits: ['Air purification', 'Easy to propagate', 'Pet-friendly'],
        advisory: ['Prefers bright indirect light', 'Water when soil is slightly dry', 'Repot when rootbound'],
    },
    'Rose Bush': {
        name: 'Rose Bush',
        suitableForIndoor: false,
        benefits: ['Beautiful flowers', 'Pleasant fragrance'],
        advisory: ['Requires direct sunlight', 'Regular watering needed', 'Pruning required'],
    },
    'Tomato Plant': {
        name: 'Tomato Plant',
        suitableForIndoor: false,
        benefits: ['Produces edible fruit', 'Nutritious'],
        advisory: ['Requires lots of sunlight', 'Water frequently', 'Needs support like a trellis'],
    },
      'Lavender': {
        name: 'Lavender',
          suitableForIndoor: false,
          benefits: ['Pleasant fragrance', 'Attracts pollinators', 'Calming properties'],
          advisory: ['Requires direct sunlight', 'Well-draining soil', 'Prune annually'],
      },
    'Oak Tree': {
        name: 'Oak Tree',
        suitableForIndoor: false,
        benefits: ['Provides shade', 'Supports wildlife', 'Beautiful fall colors'],
        advisory: ['Requires large space', 'Needs direct sunlight', 'Long lifespan'],
    },
    'Daisy': {
      name: 'Daisy',
        suitableForIndoor: false,
        benefits: ['Beautiful flowers', 'Attracts pollinators'],
        advisory: ['Requires direct sunlight', 'Water frequently', 'Well-draining soil needed']
    }
};


const PlantIdentifier: React.FC = () => {
  const [identifiedPlant, setIdentifiedPlant] = useState<PlantInfo | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setIsLoading(true);
    const file = event.target.files?.[0];

    if (!file) {
      setIsLoading(false);
      return;
    }


    const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result as string);
      };
    reader.readAsDataURL(file);

    // Mock API call with timeout
    setTimeout(() => {
    const mockPlantNames = Object.keys(mockPlantData);
      const randomIndex = Math.floor(Math.random() * mockPlantNames.length)
      const identifiedPlantName = mockPlantNames[randomIndex]

        if (identifiedPlantName){
            setIdentifiedPlant(mockPlantData[identifiedPlantName]);
        } else {
            setError("Could not identify the plant. Please try again")
        }
        setIsLoading(false);
    }, 1500);
  };

    const handleCameraCapture = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRetry = () => {
        setIdentifiedPlant(null);
        setImagePreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-green-50 to-white opacity-20"></div>
        <div className="relative z-10 max-w-md w-full p-6 bg-white rounded-2xl shadow-lg border-2 border-green-200">
        <h1 className="text-2xl font-semibold text-green-800 text-center mb-6">Plant Identifier</h1>


        {imagePreview ? (
          <div className="flex flex-col items-center justify-center mb-6 transition-all duration-500 ease-in-out">
            <img src={imagePreview} alt="Plant Preview" className="rounded-xl w-48 h-48 object-cover mb-4 border-2 border-green-200" />
            {isLoading && <div className="text-center text-gray-600 animate-pulse">Identifying...</div>}
            {error && <div className="text-center text-red-500 mb-2">{error}</div>}
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.248-.75.565-1.027.917-.364.497-.638.979-.745 1.568A3.18 3.18 0 0 0 3 12.107v3.75c0 .714.342 1.41.923 1.942.232.215.447.422.647.625.172.177.336.348.478.527.155.194.308.404.437.617A3.18 3.18 0 0 0 6 19.893v-3.75c0-.714-.342-1.41-.923-1.942a.97.97 0 0 0-.478-.527 4.91 4.91 0 0 1-.181-.438c-.136-.181-.267-.371-.385-.568A2.31 2.31 0 0 1 6.827 6.176Zm9.786 0A2.31 2.31 0 0 1 15.186 7.23c-.38.248-.75.565-1.027.917-.364.497-.638.979-.745 1.568A3.18 3.18 0 0 0 15 12.107v3.75c0 .714.342 1.41.923 1.942.232.215.447.422.647.625.172.177.336.348.478.527.155.194.308.404.437.617A3.18 3.18 0 0 0 18 19.893v-3.75c0-.714-.342-1.41-.923-1.942a.97.97 0 0 0-.478-.527 4.91 4.91 0 0 1-.181-.438c-.136-.181-.267-.371-.385-.568A2.31 2.31 0 0 1 16.613 6.176Z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
                  </svg>
              </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                />
              <button onClick={handleCameraCapture} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                  Take a Photo
              </button>
            </div>
        )}


      {identifiedPlant && (
        <div className="mt-6 p-4 border-2 border-green-200 rounded-xl transition-all duration-500 ease-in-out">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Identified Plant: {identifiedPlant.name}</h2>
          <p className="mb-2">
            <span className="font-semibold text-green-700">Suitable for Indoor:</span>{' '}
            {identifiedPlant.suitableForIndoor ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
          <h3 className="font-semibold text-green-700 mt-4 mb-2">Benefits:</h3>
          <ul className="list-disc list-inside mb-4">
            {identifiedPlant.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700">{benefit}</li>
            ))}
          </ul>
          <h3 className="font-semibold text-green-700 mt-4 mb-2">Advisory Information:</h3>
          <ul className="list-disc list-inside">
            {identifiedPlant.advisory.map((advisory, index) => (
              <li key={index} className="text-gray-700">{advisory}</li>
            ))}
          </ul>
        </div>
      )}
            {(identifiedPlant || error) &&
                <div className="mt-6 flex justify-center">
                    <button onClick={handleRetry} className="bg-green-200 hover:bg-green-300 text-green-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                        Retry
                    </button>
                </div>
            }
    </div>
    </div>
  );
};

export default PlantIdentifier;