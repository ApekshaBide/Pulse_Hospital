// src/hooks/use-diagnostics.js

import useSWR from 'swr';
import { useMemo } from 'react';

import {
  fetchDiagnosticsConfig,
  fetchCategoryDetail,
  fetchCart,
   addToCart,
   clearCart,
    removeFromCart,
     fetchTestDetail,
     fetchPopularTests,
     updateCartQuantity,
  createDiagnosticsConfig,
   fetchHealthPackages,
  updateDiagnosticsConfig,
     fetchTestsByCategory,
     fetchDiagnosticsCategories,
} from 'src/utils/diagnostic';

// ----------------------------------------------------------------------

export function useDiagnosticsConfig() {
  const { data, error, isLoading, mutate } = useSWR(
    'diagnostics-config',
    fetchDiagnosticsConfig,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      config: data || null,
      configLoading: isLoading,
      configError: error,
      configEmpty: !isLoading && !data,
      refreshConfig: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useDiagnosticsCategories() {
  const { data, error, isLoading, mutate } = useSWR(
    'diagnostics-categories',
    fetchDiagnosticsCategories,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

const categories = useMemo(() => data?.categories || [], [data]);

  const memoizedValue = useMemo(() => {
    const featuredCategories = categories.filter(category => category.is_featured);
    const allCategories = categories;

    return {
      categories: allCategories,
      featuredCategories,
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesEmpty: !isLoading && categories.length === 0,
      refreshCategories: mutate,
    };
  }, [error, isLoading, mutate, categories]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useCategoryDetail(categoryId) {
  const { data, error, isLoading, mutate } = useSWR(
    categoryId ? `category-detail-${categoryId}` : null,
    () => fetchCategoryDetail(categoryId),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      categoryDetail: data || null,
      categoryDetailLoading: isLoading,
      categoryDetailError: error,
      categoryDetailEmpty: !isLoading && !data,
      refreshCategoryDetail: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useTestDetail(testId) {
  const { data, error, isLoading, mutate } = useSWR(
    testId ? `test-detail-${testId}` : null,
    () => fetchTestDetail(testId),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      testDetail: data || null,
      testDetailLoading: isLoading,
      testDetailError: error,
      testDetailEmpty: !isLoading && !data,
      refreshTestDetail: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function usePopularTests() {
  const { data, error, isLoading, mutate } = useSWR(
    'popular-tests',
    fetchPopularTests,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      popularTests: data || [],
      popularTestsLoading: isLoading,
      popularTestsError: error,
      popularTestsEmpty: !isLoading && (!data || data.length === 0),
      refreshPopularTests: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useTestsByCategory(categoryId, params = {}) {
  const cacheKey = categoryId
    ? `tests-by-category-${categoryId}-${JSON.stringify(params)}`
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => fetchTestsByCategory(categoryId, params),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      testsByCategory: data?.results || [],
      testsByCategoryCount: data?.count || 0,
      testsByCategoryNext: data?.next || null,
      testsByCategoryPrevious: data?.previous || null,
      testsByCategoryLoading: isLoading,
      testsByCategoryError: error,
      testsByCategoryEmpty: !isLoading && (!data?.results || data.results.length === 0),
      refreshTestsByCategory: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useHealthPackages() {
  const { data, error, isLoading, mutate } = useSWR(
    'health-packages',
    fetchHealthPackages,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      packages: data?.packages || [],
      packagesLoading: isLoading,
      packagesError: error,
      packagesEmpty: !isLoading && (!data?.packages || data.packages.length === 0),
      refreshPackages: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR(
    'diagnostics-cart',
    fetchCart,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const cart = data?.results?.[0] || null;

  const memoizedValue = useMemo(
    () => ({
      cart,
      cartItems: cart?.items || [],
      cartTotalItems: cart?.total_items || 0,
      cartSubtotal: cart?.subtotal || "0.00",
      cartHomeCollectionCharge: cart?.home_collection_charge || "0.00",
      cartTotalAmount: cart?.total_amount || "0.00",
      cartLoading: isLoading,
      cartError: error,
      cartEmpty: !isLoading && (!cart || !cart.items || cart.items.length === 0),
      refreshCart: mutate,
    }),
    [error, isLoading, mutate, cart]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useDiagnosticsActions() {
  const { refreshConfig } = useDiagnosticsConfig();
  const { refreshCart } = useCart();

const createConfig = async (configData) => {
  const newConfig = await createDiagnosticsConfig(configData);
  refreshConfig();
  return newConfig;
};

  const updateConfig = async (configId, configData) => {
  const updatedConfig = await updateDiagnosticsConfig(configId, configData);
  refreshConfig();
  return updatedConfig;
};

  // Cart actions
 const addItemToCart = async (cartId, testId, quantity = 1) => {
  const updatedCart = await addToCart(cartId, testId, quantity);
  refreshCart();
  return updatedCart;
};
const updateItemQuantity = async (cartId, testId, quantity) => {
  const updatedCart = await updateCartQuantity(cartId, testId, quantity);
  refreshCart();
  return updatedCart;
};
const removeItemFromCart = async (cartId, testId) => {
  const updatedCart = await removeFromCart(cartId, testId);
  refreshCart();
  return updatedCart;
};

const clearAllCart = async (cartId) => {
  const updatedCart = await clearCart(cartId);
  refreshCart();
  return updatedCart;
};

  return {
    createConfig,
    updateConfig,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearAllCart,
  };
}

// ----------------------------------------------------------------------

// Combined hook for all diagnostics data
export function useDiagnostics() {
  const configResult = useDiagnosticsConfig();
  const categoriesResult = useDiagnosticsCategories();
  const packagesResult = useHealthPackages();
  const cartResult = useCart();
  const actions = useDiagnosticsActions();

  const memoizedValue = useMemo(
    () => ({
      // Config data
      config: configResult.config,
      configLoading: configResult.configLoading,
      configError: configResult.configError,
      configEmpty: configResult.configEmpty,

      // Categories data
      categories: categoriesResult.categories,
      featuredCategories: categoriesResult.featuredCategories,
      categoriesLoading: categoriesResult.categoriesLoading,
      categoriesError: categoriesResult.categoriesError,
      categoriesEmpty: categoriesResult.categoriesEmpty,

      // Packages data
      packages: packagesResult.packages,
      packagesLoading: packagesResult.packagesLoading,
      packagesError: packagesResult.packagesError,
      packagesEmpty: packagesResult.packagesEmpty,

      // Cart data
      cart: cartResult.cart,
      cartItems: cartResult.cartItems,
      cartTotalItems: cartResult.cartTotalItems,
      cartSubtotal: cartResult.cartSubtotal,
      cartHomeCollectionCharge: cartResult.cartHomeCollectionCharge,
      cartTotalAmount: cartResult.cartTotalAmount,
      cartLoading: cartResult.cartLoading,
      cartError: cartResult.cartError,
      cartEmpty: cartResult.cartEmpty,

      // Actions
      createConfig: actions.createConfig,
      updateConfig: actions.updateConfig,
      addItemToCart: actions.addItemToCart,
      updateItemQuantity: actions.updateItemQuantity,
      removeItemFromCart: actions.removeItemFromCart,
      clearAllCart: actions.clearAllCart,

      // Refresh functions
      refreshConfig: configResult.refreshConfig,
      refreshCategories: categoriesResult.refreshCategories,
      refreshPackages: packagesResult.refreshPackages,
      refreshCart: cartResult.refreshCart,

      // Loading states
      isLoading: configResult.configLoading || categoriesResult.categoriesLoading || packagesResult.packagesLoading,
      hasError: configResult.configError || categoriesResult.categoriesError || packagesResult.packagesError,
    }),
    [configResult, categoriesResult, packagesResult, cartResult, actions]
  );

  return memoizedValue;
}
