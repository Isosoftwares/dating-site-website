import { Title, Button } from "@mantine/core";
// import image from "./assets/image.svg";
import { useNavigate } from "react-router-dom";

function F404Page() {
  const navigate = useNavigate();

  return (
    <div className="">
      <section class="flex items-center h-screen p-16 theme">
        <div class="container flex flex-col items-center ">
          <div class="flex flex-col gap-6 max-w-md text-center">
            <h2 class="font-extrabold text-9xl text-gray-700 ">
              <span class="sr-only">Error</span>404
            </h2>
            <p class="text-2xl md:text-3xl ">
              Sorry, we couldn't find this page.
            </p>
            <p>
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
            </p>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="md"
              mt="xl"
              className={"primary-btn"}
            >
              Go back
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default F404Page;
