"use client";

import { useState, useEffect } from "react";
import { Invoice, InvoiceItem } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setFormData } from "@/lib/redux/invoiceSlice";
import { getTaxConfig, formatTaxLabel } from "@/lib/taxConfig";

interface InvoiceFormProps {
  onSubmit: (invoice: Invoice) => void;
  isLoading?: boolean;
}

export default function InvoiceForm({ onSubmit, isLoading }: InvoiceFormProps) {
  const dispatch = useAppDispatch();
  const savedFormData = useAppSelector((state) => state.invoice.formData);

  // Initialize form data with correct tax rate
  const [localFormData, setLocalFormData] = useState<Invoice>(() => {
    const initialConfig = getTaxConfig(savedFormData.currency);
    // If tax rate is 0, set it to the default for the currency
    if (savedFormData.taxRate === 0 || savedFormData.taxRate === undefined) {
      return {
        ...savedFormData,
        taxRate: initialConfig.defaultTaxRate,
      };
    }
    return savedFormData;
  });

  // Get tax configuration based on currency
  const taxConfig = getTaxConfig(localFormData.currency);

  // Load saved data on mount, but ensure tax rate is set
  useEffect(() => {
    const config = getTaxConfig(savedFormData.currency);
    const updatedData = {
      ...savedFormData,
      // If saved tax rate is 0, use the default for that currency
      taxRate:
        savedFormData.taxRate === 0
          ? config.defaultTaxRate
          : savedFormData.taxRate,
    };
    setLocalFormData(updatedData);
  }, [savedFormData]);

  // Update tax rate when currency changes
  useEffect(() => {
    const newTaxConfig = getTaxConfig(localFormData.currency);
    // Only update if the tax rate is currently 0 or undefined (user hasn't set custom rate)
    setLocalFormData((prev) => ({
      ...prev,
      taxRate: newTaxConfig.defaultTaxRate,
    }));
  }, [localFormData.currency]);

  const handleInputChange = (
    section: "from" | "to",
    field: string,
    value: string
  ) => {
    setLocalFormData({
      ...localFormData,
      [section]: {
        ...localFormData[section],
        [field]: value,
      },
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const newItems = [...localFormData.items];
    if (field === "description") {
      newItems[index] = {
        ...newItems[index],
        description: value,
      };
    } else if (field === "quantity") {
      const numValue = value === "" ? 0 : Number(value);
      newItems[index] = {
        ...newItems[index],
        quantity: isNaN(numValue) ? 0 : numValue,
      };
    } else if (field === "unitPrice") {
      const numValue = value === "" ? 0 : Number(value);
      newItems[index] = {
        ...newItems[index],
        unitPrice: isNaN(numValue) ? 0 : numValue,
      };
    }
    setLocalFormData({ ...localFormData, items: newItems });
  };

  const addItem = () => {
    setLocalFormData({
      ...localFormData,
      items: [
        ...localFormData.items,
        { description: "", quantity: 1, unitPrice: 0 },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (localFormData.items.length > 1) {
      const newItems = localFormData.items.filter((_, i) => i !== index);
      setLocalFormData({ ...localFormData, items: newItems });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to Redux store before submitting
    dispatch(setFormData(localFormData));

    // Then submit
    onSubmit(localFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* From Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          From (Your Company)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={localFormData.from.name}
              onChange={(e) =>
                handleInputChange("from", "name", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={localFormData.from.email}
              onChange={(e) =>
                handleInputChange("from", "email", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={localFormData.from.address}
              onChange={(e) =>
                handleInputChange("from", "address", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={localFormData.from.phone}
              onChange={(e) =>
                handleInputChange("from", "phone", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {taxConfig.taxIdLabel} ({taxConfig.taxIdShortLabel})
            </label>
            <input
              type="text"
              value={localFormData.from.taxId}
              onChange={(e) =>
                handleInputChange("from", "taxId", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={taxConfig.taxIdShortLabel}
            />
          </div>
        </div>
      </div>

      {/* To Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Bill To (Client)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={localFormData.to.name}
              onChange={(e) => handleInputChange("to", "name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={localFormData.to.email}
              onChange={(e) => handleInputChange("to", "email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={localFormData.to.address}
              onChange={(e) =>
                handleInputChange("to", "address", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={localFormData.to.phone}
              onChange={(e) => handleInputChange("to", "phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {taxConfig.taxIdLabel} ({taxConfig.taxIdShortLabel})
            </label>
            <input
              type="text"
              value={localFormData.to.taxId}
              onChange={(e) => handleInputChange("to", "taxId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={taxConfig.taxIdShortLabel}
            />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Invoice Items
        </h2>
        <div className="space-y-4">
          {localFormData.items.map((item, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Item description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={item.unitPrice || ""}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={localFormData.items.length === 1}
                    className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Additional Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={localFormData.dueDate}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={localFormData.currency}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, currency: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
              <option value="NOK">NOK - Norwegian Krone</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="AED">AED - UAE Dirham</option>
              <option value="SAR">SAR - Saudi Riyal</option>
              <option value="TRY">TRY - Turkish Lira</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="THB">THB - Thai Baht</option>
              <option value="IDR">IDR - Indonesian Rupiah</option>
              <option value="MYR">MYR - Malaysian Ringgit</option>
              <option value="PHP">PHP - Philippine Peso</option>
              <option value="VND">VND - Vietnamese Dong</option>
              <option value="PLN">PLN - Polish Zloty</option>
              <option value="DKK">DKK - Danish Krone</option>
              <option value="CZK">CZK - Czech Koruna</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formatTaxLabel(localFormData.currency, localFormData.taxRate)}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={localFormData.taxRate || ""}
              onChange={(e) =>
                setLocalFormData({
                  ...localFormData,
                  taxRate: Number(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Default: ${taxConfig.defaultTaxRate}%`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={localFormData.discount || ""}
              onChange={(e) =>
                setLocalFormData({
                  ...localFormData,
                  discount: Number(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={localFormData.notes}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Thank you for your business!"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Terms & Conditions
            </label>
            <textarea
              value={localFormData.terms}
              onChange={(e) =>
                setLocalFormData({ ...localFormData, terms: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Payment due within 30 days"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Preview Invoice →"}
        </button>
      </div>
    </form>
  );
}
