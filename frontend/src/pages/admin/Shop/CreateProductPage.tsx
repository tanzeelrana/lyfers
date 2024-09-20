import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import baseUrl from "../../../config/apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const sizesList = ["XS", "S", "M", "L", "XL"];

interface Category {
  id: string;
  name: string;
}

interface Color {
  id: string;
  code: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  subcategoryId: string;
  size: string[];
  colors: Color[];
  images: {
    fullPath: string;
    id: number;
    productId: number;
    image: string;
  }[];
  existingImageIds: string[];
}

export default function CreateProductPage() {
  const { productId } = useParams<{ productId?: string }>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategoryId, setSubcategoryId] = useState<string>("");
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingImageIds, setExistingImageIds] = useState<number[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  const navigate = useNavigate();

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get<Category[]>(
          `${baseUrl}/subcategories`
        );
        const colorsResponse = await axios.get<Color[]>(`${baseUrl}/colors`);
        setCategories(categoriesResponse.data);
        setColors(colorsResponse.data);

        if (productId) {
          const productResponse = await axios.get<Product>(
            `${baseUrl}/products/${productId}`
          );
          const productData = productResponse.data;
          setTitle(productData.title);
          setDescription(productData.description);
          setPrice(productData.price);
          setQuantity(productData.quantity);
          // if(productData.size != null){

          //   setSelectedSizes(productData.size)
          // }
          setSubcategoryId(productData.subcategoryId);
          setSelectedColors(productData.colors.map((color) => color.id));
          setExistingImages(productData.images.map((img) => img.fullPath));
          setExistingImageIds(productData.images.map((img) => img.id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [productId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setRemovedImageIds((prevIds) => [...prevIds, existingImageIds[index]]);
    setExistingImageIds((prevIds) => prevIds.filter((_, i) => i !== index));  };

  const handleSizeChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedSizes(event.target.value as string[]);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (price === null || price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (quantity === null || quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0";
    if (!subcategoryId) newErrors.subcategoryId = "Category is required";
    if (selectedSizes.length === 0)
      newErrors.selectedSizes = "At least one size must be selected";
    if (selectedColors.length === 0)
      newErrors.selectedColors = "At least one color must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price!.toString());
    formData.append("quantity", quantity!.toString());
    formData.append("subcategoryId", subcategoryId);
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("colorIds", JSON.stringify(selectedColors));
    formData.append("removedImageIds", JSON.stringify(removedImageIds));

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      if (productId) {
        await axios.put(`${baseUrl}/products/${productId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product Updated successfully!");
        navigate("/admin/products");
      } else {
        await axios.post(`${baseUrl}/products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product created successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  const allImages = [
    ...existingImages,
    ...selectedImages.map((image) => URL.createObjectURL(image)),
  ];

  return (
    <Grid
      container
      width="100%"
      direction="column"
      padding={{ xs: 0, sm: 0, md: 4 }}
      rowSpacing={3}
      flexShrink={0}
      sx={{ marginBottom: "40px" }}
    >
      <Grid item xs={12}>
        <Grid container direction="column" flexShrink={0}>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: { xs: "8px", sm: "12px", md: "16px" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "120%",
                color: "#000000",
                marginLeft: { xs: 0, md: 20 },
              }}
            >
              {productId ? "Update Product" : "Add Product"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ borderRadius: 4, border: "1px solid" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          padding={3}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <ImageIcon sx={{ fontSize: 50, color: "#ccc" }} />
                </IconButton>
                <Typography
                  sx={{
                    position: "absolute",
                    marginTop: "130px",
                    color: "#999",
                  }}
                >
                  Upload Pictures
                </Typography>
              </Box>
            </Grid>

            {/* Preview All Images (New + Existing) */}
            {allImages.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {allImages.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`Image ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: 2,
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                        }}
                        onClick={() => {
                          if (index < existingImages.length) {
                            handleRemoveExistingImage(index);
                          } else {
                            handleRemoveImage(index - existingImages.length);
                          }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="subcategory-label">Category</InputLabel>
                <Select
                  labelId="subcategory-label"
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                  error={!!errors.subcategoryId}
                  renderValue={(selected) =>
                    selected
                      ? categories.find((cat) => cat.id === selected)?.name ||
                        ""
                      : ""
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.subcategoryId}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="size-label">Size</InputLabel>
                <Select
                  labelId="size-label"
                  multiple
                  value={selectedSizes}
                  onChange={handleSizeChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {sizesList.map((size) => (
                    <MenuItem key={size} value={size}>
                      <Checkbox checked={selectedSizes.indexOf(size) > -1} />
                      <ListItemText primary={size} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Colors</InputLabel>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {colors.map((color) => (
                  <Box
                    key={color.id}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color.code,
                      border: selectedColors.includes(color.id)
                        ? "3px solid #000"
                        : "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleColorSelect(color.id)}
                  />
                ))}
              </Box>
              {errors.selectedColors && (
                <Typography color="error">{errors.selectedColors}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="space-between"
              gap={2}
            >
              <Button
                fullWidth
                variant="contained"
                color="warning"
                size="large"
                sx={{ minWidth: "120px" }}
                type="submit"
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                size="large"
                sx={{ minWidth: "120px" }}
                onClick={() => navigate("/admin/products")}
              >
                Discard
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
