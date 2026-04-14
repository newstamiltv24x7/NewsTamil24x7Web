import Link from "next/link";
import Image from "next/image";
import FourNotFour from "../public/newsTamilIcons/icons/404.jpg";
import { Box, Button } from "@mui/material";

export default function Custom404() {
    const embedUrl = `https://www.youtube.com/embed/gynWNinqmjw`;

    return (
        <div style={{minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 20}}>
            <div style={{textAlign: "center"}}>
                <h1 style={{margin: 0}}>Site Under Construction</h1>
                <p style={{margin: 0}}>Sorry for the inconvenience.</p>
            </div>

            <div style={{width: "100%", maxWidth: 900, aspectRatio: "16/9"}}>
                <iframe
                    title="Live Stream"
                    src={embedUrl}
                    style={{width: "100%", height: "100%", border: 0}}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

// <div style={{textAlign:"center"}} className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-100 text-center p-6">
//       {/* Floating Image */}
//       <div className="relative">
//         <Box>
//         <Image
//         fetchPriority="high" rel="preload"
//           src={FourNotFour} // Replace with your own image (store it in the `public` folder)
//           alt="404 Not Found"
//           width={600}
//           height={400}
//           className="animate-float"
//           style={{
//             width: "60%",
//             height: "100%",
//             borderRadius: "6px",
//           }}
//         />
//         </Box>
        
//       </div>

//       {/* Large 404 Text */}
//       <h1 className="text-6xl font-bold text-blue-600 mt-6">404</h1>

//       {/* Message */}
//       <h2 className="text-2xl font-semibold mt-2 text-gray-800">
//         Oops! Page Not Found
//       </h2>
//       <p className="text-gray-500 mt-2 max-w-md">
//         The page you are looking for might have been removed or is temporarily unavailable.
//       </p>

//       {/* Home Button */}
//       <Link
//         href="/"
//         className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
//       >
//         <Button 
//          sx={{
//           fontFamily: "var(--arial-font)",
//           color: "#fb6002",
//           textTransform: "capitalize",
//           fontSize: 20,
//           fontWeight: 700,
          
//         }}>
//         Go Back Home
//         </Button>
        
//       </Link>
//     </div>


   
//   );
// }
