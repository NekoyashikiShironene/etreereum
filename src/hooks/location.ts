import { useEffect, useState } from "react";

type TGpsLocation = {
    latitude: number,
    longitude: number
}

const coordinates = [
    [13.731506, 100.554600],
    [13.730897, 100.554260],
    [13.727464, 100.554491],
    [13.726522, 100.554246],
    [13.730907, 100.543004],
    [13.732085, 100.544374],
    [13.733654, 100.541408],
    [13.733942, 100.539509],
    [13.733776, 100.538779],
    [13.727766, 100.541978]
]

export function useLocation(random: boolean = true) {
    const [location, setLocation] = useState<TGpsLocation>({ latitude: 13, longitude: 100 });

    useEffect(() => {
        try {
            if (random) {
                const [latitude, longitude] = coordinates[Math.floor(Math.random() * coordinates.length + 1)];
                setLocation({ latitude, longitude });
                return
            }


            function success(position: { coords: { latitude: number; longitude: number; }; }) {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }

            function error() {

            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        } catch {
            const [latitude, longitude] = coordinates[0];
            setLocation({latitude, longitude});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { location, setLocation };
}