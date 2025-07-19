import { useState } from "react";

function App() {
  const [status, setStatus] = useState<{ ok: boolean }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function callStatus() {
    setIsLoading(true);
    setError(null);

    await new Promise((res) => setTimeout(res, 2000));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/status`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between p-4 sm:p-6 lg:p-8">
        <a href="/" className="text-lg sm:text-xl font-semibold">
          LookAndType!
        </a>
        <nav className="flex items-center">
          <ul className="flex items-center gap-3">
            <li>
              <a href="/" className="text-sm sm:text-base hover:underline">
                Welcome, man!
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={callStatus}
            disabled={isLoading}
            className="w-full sm:w-auto mb-4 px-4 py-2 bg-blue-500 text-white rounded transition-all ease hover:bg-blue-600 disabled:bg-gray-400 text-sm sm:text-base"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  role="progressbar"
                  className="animate-spin h-4 w-4 rounded-full border-2 border-transparent border-t-white"
                ></span>
                Loading...
              </span>
            ) : (
              "Call API"
            )}
          </button>

          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded text-sm sm:text-base">
              <strong>Error:</strong> {error}
            </div>
          )}

          {status && (
            <div className="bg-gray-100 p-3 sm:p-4 rounded overflow-auto">
              <pre className="text-xs sm:text-sm">
                <code>{JSON.stringify(status, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Mobile-first responsive table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Mobile view - Card layout */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-4 bg-gray-50 font-semibold text-gray-900">
                Employee Directory
              </div>

              <div className="p-4 space-y-4">
                <div className="border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Nandor the Relentless
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">DoB:</span> 04/06/1262
                    </p>
                    <p>
                      <span className="font-medium">Role:</span> Vampire Warrior
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span> $0
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Laszlo Cravensworth
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">DoB:</span> 19/10/1678
                    </p>
                    <p>
                      <span className="font-medium">Role:</span> Vampire
                      Gentleman
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span> $0
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-2">Nadja</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">DoB:</span> 15/03/1593
                    </p>
                    <p>
                      <span className="font-medium">Role:</span> Vampire
                      Seductress
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span> $0
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Colin Robinson
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">DoB:</span> 01/09/1971
                    </p>
                    <p>
                      <span className="font-medium">Role:</span> Energy Vampire
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span> $53,000
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Guillermo de la Cruz
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">DoB:</span> 18/11/1991
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      Familiar/Vampire Hunter
                    </p>
                    <p>
                      <span className="font-medium">Salary:</span> $0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop view - Table layout */}
          <div className="hidden sm:block">
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 whitespace-nowrap text-sm lg:text-base">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 whitespace-nowrap text-sm lg:text-base">
                      DoB
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 whitespace-nowrap text-sm lg:text-base">
                      Role
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 whitespace-nowrap text-sm lg:text-base">
                      Salary
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 text-sm lg:text-base">
                      Nandor the Relentless
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      04/06/1262
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      Vampire Warrior
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      $0
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 text-sm lg:text-base">
                      Laszlo Cravensworth
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      19/10/1678
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      Vampire Gentleman
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      $0
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 text-sm lg:text-base">
                      Nadja
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      15/03/1593
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      Vampire Seductress
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      $0
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 text-sm lg:text-base">
                      Colin Robinson
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      01/09/1971
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      Energy Vampire
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      $53,000
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900 text-sm lg:text-base">
                      Guillermo de la Cruz
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      18/11/1991
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      Familiar/Vampire Hunter
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900 text-sm lg:text-base">
                      $0
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
